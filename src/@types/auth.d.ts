import { Request } from "express"

declare module "express" { 
  export interface Request extends Request {
    user?: Object
  }
}