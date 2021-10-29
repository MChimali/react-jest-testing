import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchBar } from './search-bar.hook';
import { Employee } from '../../../pods/employee-list/employee-list.vm';
import * as commonHooks from 'common/hooks/debounce.hook';

const employeeList: Employee[] = [
  {
    id: '1',
    isActive: true,
    name: 'Miguel',
    email: 'alpi@alpi.com',
    lastDateIncurred: 'justo',
  },
  {
    id: '2',
    isActive: true,
    name: 'Marcela',
    email: 'alpi@alpi.com',
    lastDateIncurred: 'justo',
  },
  {
    id: '3',
    isActive: true,
    name: 'Antonio',
    email: 'alpi@alpi.com',
    lastDateIncurred: 'justo',
  },
];

describe('useSearchBar specs', () => {
  it('should return full list if empty string search', () => {
    const { result } = renderHook(() => useSearchBar(employeeList, ['name']));
    expect(result.current.filteredList).toEqual(employeeList);
  });

  it('should return first element if setSearch is set to "Mi"', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchBar(employeeList, ['name'])
    );
    act(() => {
      result.current.onSearch('Mi');
    });

    await waitForNextUpdate();

    expect(result.current.search).toEqual('Mi');
    expect(result.current.filteredList).toEqual([employeeList[0]]);
  });

  it('should call useDebounce when using onSearch', () => {
    const debounceSpyStub = jest.spyOn(commonHooks, 'useDebounce');
    const { result } = renderHook(() => useSearchBar(employeeList, ['name']));
    act(() => {
      result.current.onSearch('Mi');
    });
    expect(debounceSpyStub).toHaveBeenCalledWith('Mi', 250);
  });

  it('Should return return first element of array when useDebounce returns "Mi"', () => {
    const debounceSpyStub = jest.spyOn(commonHooks, 'useDebounce').mockReturnValue('Mi');
    const { result } = renderHook(() => useSearchBar(employeeList, ['name']));
    expect(result.current.filteredList).toEqual([employeeList[0]]);
  });
});
