import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createContract,
  fetchContracts,
  deleteContract,
  fetchContractDetail,
  terminateContract as terminateContractAPI,
} from '../../api/contract';

const createContractAction = createAsyncThunk('contract/create', async contract => {
  return await createContract(contract);
});

const fetchContractsAction = createAsyncThunk('contract/fetch', async () => {
  return await fetchContracts();
});

// const getContractDetailAction = createAsyncThunk('contract/getDetail', async contract => {
//   return await getContractDetail(contract);
// });

const deleteContractAction = createAsyncThunk('contract/delete', async contractId => {
  return await deleteContract(contractId);
});

const getContractDetail = createAsyncThunk('contract/details', async contractId => {
  const contract = await fetchContractDetail(contractId);
  return contract;
});

const terminateContract = createAsyncThunk('contract/terminate', async contractId => {
  await terminateContractAPI(contractId);
});

const contractSlide = createSlice({
  name: 'contract',
  initialState: {
    contracts: null,
    loading: false,
    error: null,
    contract: null,
  },
  reducers: {
    uploadContract: (state, action) => {
      if (action.payload.type === 'add') {
        state.contracts.push(action.payload.data);
      } else if (action.payload.type === 'delete') {
        state.contracts.splice(action.payload.index, 1);
      }
    },
  },
  extraReducers: {
    // create
    [createContractAction.pending]: state => {
      state.loading = true;
    },
    [createContractAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createContractAction.fulfilled]: (state, action) => {
      state.loading = false;
    },
    // fetch
    [fetchContractsAction.pending]: state => {
      state.loading = true;
    },
    [fetchContractsAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchContractsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.contracts = action.payload;
    },
    // delete
    [deleteContractAction.pending]: state => {
      state.loading = true;
    },
    [deleteContractAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteContractAction.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [getContractDetail.pending]: state => {
      state.loading = true;
    },
    [getContractDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getContractDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.contract = action.payload;
    },

    [terminateContract.pending]: state => {
      state.loading = true;
    },
    [terminateContract.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [terminateContract.fulfilled]: state => {
      state.loading = false;
    },
  },
});

export {
  terminateContract,
  createContractAction,
  fetchContractsAction,
  deleteContractAction,
  getContractDetail,
};
export const { uploadContract } = contractSlide.actions;
export default contractSlide.reducer;
