import {
  LucideIcon
} from "lucide-react";

export type Step =
  | 'address'
  | 'payment'
  | 'success';


export type PaymentMethod = {
  id:string;
  icon:any;
  label:string;
  desc:string;
};


export interface AddressForm {

  fullName:string;

  phone:string;

  line1:string;

  line2:string;

  city:string;

  state:string;

  pincode:string;

}