import { fireEvent, render, screen } from "@testing-library/react";
import LabelledInput from "./LabelledInput";
import check from "../assets/check.svg";


describe('LabelledInput Component', () => {
  // Tests for the LabelledInput component with type set to text 
  describe('Input type: Text', () => {
    test('renders input with label and value', () => {
      render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} />
      );
      const labelElement = screen.getByText(/label/i);
      const inputElement = screen.getByDisplayValue(/value/i);
      expect(labelElement).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
    });

    test('renders input with placeholder', () => {
      render(
        <LabelledInput label="Label" value="" setValue={() => { }} placeholder="Placeholder" />
      );
      const inputElement = screen.getByPlaceholderText(/placeholder/i);
      expect(inputElement).toBeInTheDocument();
    });

    test('user updates value', () => {
      let value = '';
      render(
        <LabelledInput label="Label" value={value} setValue={(val) => value = val} />
      );
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'New Value' } });
      expect(value).toBe('New Value');
    });

    test('renders disabled component', () => {
      render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} disabled />
      );
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeDisabled();

      expect(inputElement).not.toHaveFocus();
      fireEvent.click(inputElement);
      expect(inputElement).not.toHaveFocus();
    });

    test('renders component with error', () => {
      const { getByRole } = render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} error />
      );
      const inputElement = getByRole('textbox');
      // mui has different layers of elements, 
      // so we have to go 1 level up to get the element that wraps the mui Textfield component
      expect(inputElement.parentElement).toHaveClass('Mui-error');
    });
  });

  // Tests for the LabelledInput component with type set to autocomplete 
  describe('Input type: Autocomplete', () => {
    //creates an array of options for the autocomplete component
    const options = Array(5).fill(null).map((_, idx) => ({ label: `label_${idx + 1}`, value: `${idx + 1}` }));
    const initValue = { label: "", value: "" };

    test('autocomplete renders with placeholder, options and initial value', () => {
      const { getByRole, getByText, queryByRole } = render(
        <LabelledInput
          label="Label"
          placeholder="Test autocomplete"
          value={initValue}
          setValue={() => { }}
          inputType="autocomplete"
          options={options}
        />
      );
      expect(getByText(/label/i)).toBeInTheDocument();

      const inputElement = getByRole('combobox');
      expect(inputElement).not.toHaveFocus();

      // test placeholder
      expect(inputElement).toHaveAttribute('placeholder', 'Test autocomplete');

      // test initial value
      expect(inputElement).toHaveValue('');
      expect(inputElement).not.toHaveValue('label_1');

      fireEvent.click(inputElement);
      expect(inputElement).toHaveFocus();

      expect(queryByRole('listbox')).not.toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: 'lab' } });

      const listBox = getByRole('listbox');
      expect(listBox).toBeInTheDocument();

      options.forEach(option => {
        expect(listBox).toHaveTextContent(option.label);
      });

      expect(listBox).not.toHaveTextContent(/label_6/i);
    });


    test('autocomplete selects a value', () => {
      const setValue = jest.fn();
      const { getByRole, getByText, queryByRole } = render(
        <LabelledInput
          label="Label"
          value={initValue}
          setValue={setValue}
          inputType="autocomplete"
          options={options}
        />
      );
      const inputElement = getByRole('combobox');

      expect(inputElement).toHaveValue('');
      expect(inputElement).not.toHaveValue('Label_1');

      expect(queryByRole('listbox')).not.toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: 'lab' } });

      const listBox = getByRole('listbox');
      expect(listBox).toBeInTheDocument();

      options.forEach(option => {
        expect(listBox).toHaveTextContent(option.label);
      });

      fireEvent.click(getByText('label_3'));
      expect(setValue).toHaveBeenCalledWith({ label: 'label_3', value: '3' });
      expect(setValue).not.toHaveBeenCalledWith({ label: '', value: '' });
    });


    test('autocomplete renders with a disabled component', () => {
      const { getByRole } = render(
        <LabelledInput
          label="Label"
          value={initValue}
          setValue={() => { }}
          inputType="autocomplete"
          options={options}
          disabled
        />
      );
      const inputElement = getByRole('combobox');
      expect(inputElement).toBeDisabled();
      fireEvent.click(inputElement);
      expect(inputElement).not.toHaveFocus();
    });

    test('autocomplete renders without options', () => {
      const { getByRole, queryByRole } = render(
        <LabelledInput
          label="Label"
          value={initValue}
          setValue={() => { }}
          inputType="autocomplete"
          options={[]}
        />
      );
      const inputElement = getByRole('combobox');
      fireEvent.click(inputElement);
      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });
  });


  // Tests for the LabelledInput component with inputProps, classnames and headerVariant props
  describe('test input props', () => {
    const inputProps = {
      startAdornment: <div>Start</div>,
      endAdornment: <img src={check} alt="check" />,
    };

    test('adornment works(input props)', () => {
      const { getByText, getByRole } = render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} inputProps={inputProps} />
      );
      expect(getByText(/start/i)).toBeInTheDocument();
      expect(getByRole('img')).toBeInTheDocument();
    });

    test('adornment works for autocomplete(input type)', () => {
      const { getByText, getByRole } = render(
        <LabelledInput
          label="Label"
          value={{ label: "", value: "" }}
          setValue={() => { }}
          inputType="autocomplete"
          options={[]}
          inputProps={inputProps}
        />
      );
      expect(getByText(/start/i)).toBeInTheDocument();
      expect(getByRole('img')).toBeInTheDocument();
    });

    test('renders component with a specific headerVariant', () => {
      const { getByText } = render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} headerVariant="h1" />
      );
      const headerElement = getByText(/label/i);
      expect(headerElement).toHaveClass('MuiTypography-h1');
    });
    
    test('renders component with specified classes', () => {
      const { getByRole } = render(
        <LabelledInput label="Label" value="Value" setValue={() => { }} className="mb-15px" />
      );
      const inputElement = getByRole('textbox');
      // since LabelledInput a custom comonent that wraps the MUI components,
      // we have to go 3 levels up to get the element that wraps the mui Textfield component
      expect(inputElement.parentElement.parentElement.parentElement).toHaveClass('mb-15px');
    });
  });
});