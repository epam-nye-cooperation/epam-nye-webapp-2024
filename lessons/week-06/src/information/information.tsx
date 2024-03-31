import React from "react";

import "./information.css";

interface InformationProps {
  firstName: string;
  lastName: string;
  age: number;
}

export const Information = ({ age, firstName, lastName }: InformationProps) => {
  
  return <div className="information">
    <div>First Name: {firstName}</div>
    <div>Last Name: {lastName}</div>
    <div>Age: {age}</div>
  </div>
}