import React, { Component, PropTypes } from 'react';


const renderHiddenField = ({ input }) => (
  <input {...input} type="hidden" />
)

export default renderHiddenField;
