import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currencyService from "./currency.service";


const initialState= {
    currencies:[],
    selectedCurrency: ''
}

export const getCurrencies = createAsyncThunk('get-currencies' ,async (_, thunkApi) => {
try {
    return await currencyService.getCurrencies();
}
catch(error) {
 return thunkApi.rejectWithValue(error.response)
}
})


export const currencies = createSlice({
    name:'currencies',
    initialState,
    reducers: {
        selectCurrency: (state, action) => {
            state.selectedCurrency = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrencies.fulfilled, (state, action) => {
            state.currencies = action.payload;
        }).addCase(getCurrencies.rejected, (_, action) => {
            console.log("error", action.payload);
        })
    }
})

export const { selectCurrency} = currencies.actions;
export default currencies.reducer;