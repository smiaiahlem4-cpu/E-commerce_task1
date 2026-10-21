import { buildErrorMessage } from "vite";
import {validationResult } from 'express-validator';
export const CreateUserValidation={
  username:{
    isLength:{
      options:{
        min:4,
        max:35
      }
    },
    isString:{
      errorMessage:"Username must be string!"
    },
  },
  email:{

  },
  password:{
    isLength:{
      options:{
        min:4
      },
      errorMessage:"password must contain at least 4 characters!"
    }
  }
};
export const createProductValidation={
  name:{
    isLength:{
      options:{
        min:4
      },
      errorMessage:"Product's name must at least have 5 characthers"
    },
    isString:{
      errorMessage:"product name must be string"
    },
  },
  price:{
    
  },
  quantity:{
    
  },
  image:{

  },
  description:{

  }
};