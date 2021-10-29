import { mapProjectFromApiToVm } from './project.mapper';
import * as auxMapFunctions from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

const mockProject: apiModel.Project = {
  id: '1',
  name: 'mock',
  externalId: 'a1',
  comments: 'nothing',
  isActive: false,
  employees: [{ id: '1', employeeName: 'random' }],
};

describe('project mapper spec', () => {
  it('if mapper is fed with null it should call createEmptyProject()', () => {
    const createProjectSpy = jest.spyOn(viewModel, 'createEmptyProject');
    const result = mapProjectFromApiToVm(null);
    expect(createProjectSpy).toHaveBeenCalled();
  });

  it('if mapper is fed with undefined it should call createEmptyProject()', () => {
    const createProjectSpy = jest.spyOn(viewModel, 'createEmptyProject');
    const result = mapProjectFromApiToVm(undefined);
    expect(createProjectSpy).toHaveBeenCalled();
  });

  it('when fed an array it should return same array', () => {
    const result = mapProjectFromApiToVm(mockProject);
    expect(result).toEqual(mockProject);
  });

  it('when fed an array it should call auxiliar functions', () => {
    const mapEmployeesListSpyStub = jest.spyOn(
      auxMapFunctions,
      'mapEmployeeSummaryListFromApiToVm'
    );
    const mapEmployeeSpyStub = jest.spyOn(
      auxMapFunctions,
      'mapEmployeeSummaryFromApiToVm'
    );
    mapProjectFromApiToVm(mockProject);

    expect(mapEmployeesListSpyStub).toHaveBeenCalledWith(mockProject.employees);
    expect(mapEmployeeSpyStub).toHaveBeenCalledTimes(1);
  });
});
