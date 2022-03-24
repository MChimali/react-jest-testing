import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const props = {
  isOpen: true,
  onAccept: jest.fn(),
  onClose: jest.fn(),
  title: 'Test Dialog',
  labels: {
    closeButton: 'Cancel',
    acceptButton: 'Accept',
  },
  children: 'Deleting message',
};

describe('confirmation-dialog component spec', () => {
  it('dialog should appear when isOpen is true', () => {
    render(
      <ConfirmationDialogComponent {...props}></ConfirmationDialogComponent>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('dialog should not appear when isOpen is false', () => {
    render(
      <ConfirmationDialogComponent
        {...props}
        isOpen={false}
      ></ConfirmationDialogComponent>
    );
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('should appear H2 with title content', () => {
    render(
      <ConfirmationDialogComponent {...props}></ConfirmationDialogComponent>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.tagName).toEqual('H2');
    expect(heading.textContent).toEqual(props.title);
  });

  it('should render text in children', ()=>{
    render(
      <ConfirmationDialogComponent {...props}></ConfirmationDialogComponent>
    );
    const deletingText = screen.getByText('Deleting message');
    expect(deletingText).toBeInTheDocument();
  })

  it('if button Accept is clicked should call onAccept & onClose', () => {
    render(
      <ConfirmationDialogComponent {...props}></ConfirmationDialogComponent>
    );
    const buttonAccept = screen.getByRole('button', { name: /Accept/i });
    userEvent.click(buttonAccept);
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('if button Cancel is clicked should call only onClose', () => {
    const props2 = {
      ...props,
      onAccept: jest.fn()
    }
    render(
      <ConfirmationDialogComponent {...props2}></ConfirmationDialogComponent>
    );
    const buttonCancel = screen.getByRole('button', { name: /Cancel/i });
    userEvent.click(buttonCancel);
    expect(props2.onAccept).not.toHaveBeenCalled();
    expect(props2.onClose).toHaveBeenCalled();
  });
});
