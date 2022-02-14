import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog hook spec', () => {
  it('when rendered should have isOpen set to false and itemToDelete set to emptyLookup', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
  });

  it('when calling onOpenDialog isOpen should set to true and itemToDelete should change to given in argument', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'test' });
    });
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'test' });
  });

  it('should return itemToDelete to emptyLookUp when calling onAccept', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'test' });
      result.current.onAccept();
    });

    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
  });

  it('should return isOpen to false when calling onClose', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'test' });
      result.current.onClose();
    });

    expect(result.current.isOpen).toEqual(false);
  });
});
