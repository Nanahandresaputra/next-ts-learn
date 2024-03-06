import { config } from "@/config/config";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Datas {
  category: number;
  difficulty: string;
}

export const quizApi = createAsyncThunk("post/get", (data: Datas) => {
  return new Promise((resolve, reject): void => {
    fetch(`${config.baseUrl}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`, {
      method: "GET",
    } as any)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return resolve(res.results);
      })
      .catch((err) => reject(err));
  });
});

interface InitialState {
  question: [];
  isLoadingQuestion: boolean;
}

let initialState: InitialState = {
  question: [],
  isLoadingQuestion: false,
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(quizApi.pending, (state) => {
      state.isLoadingQuestion = true;
    }),
      builder.addCase(quizApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoadingQuestion = false;
        state.question = action.payload;
      });
  },
});

export default postsSlice.reducer;
