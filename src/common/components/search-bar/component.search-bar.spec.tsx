import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchBarComponent } from './search-bar.component';
import { Props } from './search-bar.component';
import userEvent from '@testing-library/user-event';

describe('SearchBarComponent specs', () => {
  it('should return input as tagName', () => {
    const props: Props = {
      search: 'Test',
      onSearch: jest.fn(),
      labels: {
        placeholder: 'Busca!',
      },
    };
    render(
      <SearchBarComponent
        search={props.search}
        onSearch={props.onSearch}
        labels={props.labels}
      />
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const searchIcon = screen.getByLabelText('Search icon');
    expect(inputElement.tagName).toEqual('INPUT');
    expect(inputElement.value).toEqual('Test');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should call props.onSearch when typing on input', () => {
    const props: Props = {
      search: '',
      onSearch: jest.fn(),
      labels: {
        placeholder: 'Busca!',
      },
    };
    render(
      <SearchBarComponent
        search={props.search}
        onSearch={props.onSearch}
        labels={props.labels}
      />
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.type(inputElement, 'j');
    expect(props.onSearch).toHaveBeenCalledWith('j');
  });
});
