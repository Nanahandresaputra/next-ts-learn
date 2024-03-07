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
      .catch((err) => {
         return reject(err)
      });
  });
});

interface InitialState {
  question: [];
  isLoadingQuestion: boolean;
  isErrorQuestion: boolean;
  correct: number;
  inCorrect: number;
}

let initialState: InitialState = {
  question: [],
  isLoadingQuestion: false,
  isErrorQuestion: false,
  correct: 0,
  inCorrect: 0
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    correctAnswer: (state, action: PayloadAction<any>) => {
      return {...state, correct: action.payload}
    },
    inCorrectAnswer: (state, action: PayloadAction<any>) => { 
      return {...state, inCorrect: action.payload}
    },
    resetQuestion: (state) => { 
      return { ...state, question: []}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(quizApi.pending, (state) => {
      state.isErrorQuestion = false;
      state.isLoadingQuestion = true;
    }),
      builder.addCase(quizApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoadingQuestion = false;
        state.isErrorQuestion = false;
        state.question = action.payload;
      }),
      builder.addCase(quizApi.rejected, (state) => { 
        state.isLoadingQuestion = false;
        state.isErrorQuestion = true;
      });
  },
});

export const {correctAnswer, inCorrectAnswer,resetQuestion } = postsSlice.actions;

export default postsSlice.reducer;
