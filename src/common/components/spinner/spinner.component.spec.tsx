import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { trackPromise } from 'react-promise-tracker';

describe('SpinnerComponent spec', () => {
  it('should unmount Loader component once Promise is resolved', async () => {
    trackPromise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('test');
        }, 1000);
      })
    );
    render(<SpinnerComponent />);
    const loadingDiv = screen.queryByRole('presentation');
    expect(loadingDiv).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingDiv);
    expect(loadingDiv).not.toBeInTheDocument();
  });
});
