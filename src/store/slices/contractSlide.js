const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { createContract, fetchContracts, deleteContract, getContractDetail } = require("../../api/contract");

const createContractAction = createAsyncThunk('contract/create', (contract) => {
    return await createContract(contract);
})

const fetchContractsAction = createAsyncThunk('contract/fetch', () => {
    return await fetchContracts();
})

const getContractDetailAction = createAsyncThunk('contract/getDetail', contract => {
    return await getContractDetail(contract)
})

const deleteContractAction = createAsyncThunk('contract/delete', contract => {
    return await deleteContract(contract)
})

const contractSlide = createSlice({
    name: "contract",
    initialState: {
        contracts: [],
        loading: false,
        error: null
    }, reducers: {
        uploadContract: (state, action) => {
            if (action.payload.type === "add") {
                state.contracts.push(action.payload.data);
            } else if (action.payload.type === "delete") {
                state.contracts.splice(action.payload.index, 1);
            }
        }
    },
    extraReducers: {
        // create
        [createContractAction.pending]: (state) => {
            state.loading = true
        },
        [createContractAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createContractAction.fulfilled]: (state, action) => {
            state.loading = false
        },
        // fetch
        [fetchContractsAction.pending]: (state) => {
            state.loading = true;
        },
        [fetchContractsAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
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
            state.error = action.error
        },
        [deleteContractAction.fulfilled]: (state, action) => {
            state.loading = false
        }
    }
})

export { createContractAction, fetchContractsAction, deleteContractAction }
export const { uploadContract } = contractSlide.actions;
export default contractSlide