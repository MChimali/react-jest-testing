import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SelectComponent } from './select.component';
import { Lookup } from 'common/models';
import userEvent from '@testing-library/user-event';

interface test {
  items: Lookup[];
  label: string;
  value: string;
  onChange: () => void;
}
// Arrange
const props: test = {
  items: [
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' },
    { id: '3', name: 'name3' },
    { id: '4', name: 'name4' },
    { id: '5', name: 'name5' },
  ],
  label: 'options',
  value: '',
  onChange: jest.fn().mockImplementation((e, justo) => {
    console.log(justo, e);
  }),
};
describe('common/components/form/select/select.component specs', () => {
  it('should render a select element when it feeds required props and three items', () => {
    render(<SelectComponent {...props} />);
    const selectionButton = screen.getByRole('button', { name: 'options' });
    const monthList = screen.queryByRole('listbox');
    expect(monthList).not.toBeInTheDocument();
    userEvent.click(selectionButton);
    const monthlist2 = screen.getByRole('listbox');
    expect(monthlist2).toBeInTheDocument();
  });

  it('should return a list with the five options', () => {
    render(<SelectComponent {...props} />);
    const selectionButton = screen.getByRole('button', { name: 'options' });
    userEvent.click(selectionButton);
    const optionListElements = screen.getAllByRole('option');
    expect(optionListElements).toHaveLength(5);
  });

  it('should update input value when click on an option', () => {
    render(<SelectComponent {...props} />);
    const selectionButton = screen.getByRole('button', { name: 'options' });
    userEvent.click(selectionButton);
    const listElement = screen.getByRole('option', { name: 'name2' });
    userEvent.click(listElement);
    expect(listElement.textContent).toEqual('name2');
  });

  it('should call onChange when selecting option', () => {
    render(<SelectComponent {...props} />);
    const selectionButton = screen.getByRole('button', { name: 'options' });
    userEvent.click(selectionButton);
    const listElement = screen.getByRole('option', { name: 'name2' });
    userEvent.click(listElement);
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ altKey: false }),
      expect.anything()
    );
  });
});