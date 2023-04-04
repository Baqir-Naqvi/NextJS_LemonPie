import { createGlobalStyle } from "styled-components"

const FormStyles = createGlobalStyle`
  form {
    .form-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > button {
        border-color: ${({ theme }) => theme.colors.green};
        background-color: transparent;
        color: ${({ theme }) => theme.colors.white};
        font-size: 1rem;
      }
    }

    button[type="submit"] {
      background-color: ${({ theme }) => theme.colors.green};
      margin-left: auto;
    }

    .grouped {
      border-radius: .75rem;
      margin-bottom: 1.5rem;

      .grouped-header {
        border: 1px solid ${({ theme }) => theme.colors.lightBlue};
        padding: .5rem .75rem;
        border-radius: .75rem .75rem 0 0;
        background-color: ${({ theme }) => theme.colors.darkBlue};
        color: ${({ theme }) => theme.colors.ligthIndaco};
      }

      .grouped-body {
        border-radius: 0 0 .75rem .75rem;
        border: 1px solid ${({ theme }) => theme.colors.lightBlue};
        border-top: none;
        padding: .5rem .75rem;
        color: ${({ theme }) => theme.colors.dirtWhite};
        font-weight: 300;
        font-size: .85rem;
      }
    }

    label {
      color: ${({ theme }) => theme.colors.green};
      font-size: .8rem;
      font-weight: 600;
      margin-bottom: .15rem;
    }

    legend {
      font-size: .8rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.darkGrey};
    }

    .text-muted {
      font-size: 70%;
    }

    .invalid-feedback {
      font-size: .8rem;
    }

    .input-group {
      .input-group-text {
        background-color: ${({ theme }) => theme.colors.lightBlue};
        border-color: ${({ theme }) => theme.colors.lightBlue};
        color: ${({ theme }) => theme.colors.blue};
      }
    }

    .custom-select__control,
    .form-control {
      font-size: .85rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.lightGrey};
      border-color: ${({ theme }) => theme.colors.lightBlue};
      min-height: 38px;
      background-color: ${({ theme }) => theme.colors.darkBlue};
      transition: border-color .3s ease;

      .custom-select__input-container,
      .custom-select__single-value {
        color: ${({ theme }) => theme.colors.lightGrey};
      }

      &:hover {
        border-color: ${({ theme }) => theme.colors.oblivionBlue};
      }

      &.custom-select__control--is-focused,
      &:focus {
        border-color: ${({ theme }) => theme.colors.lightGreen};
        box-shadow: ${({ theme }) => theme.inputBoxShadow};
        background-color: ${({ theme }) => theme.colors.darkBlue};
        color: ${({ theme }) => theme.colors.grey};
      }

      &.custom-select__control--is-focused {
        .custom-select__input-container,
        .custom-select__single-value {
          color: ${({ theme }) => theme.colors.grey};
        }
      }

      &.custom-select__control--is-disabled,
      &:disabled {
        background-color: ${({ theme }) => theme.colors.oblivionBlue};
      }

      ::placeholder {
        text-transform: none !important;
        color: ${({ theme }) => theme.colors.lightBlue};
      }
    }

    .custom-select__menu-list {
      background-color: ${({ theme }) => theme.colors.oblivionBlue};
    }

    .custom-select__option {
      font-size: .8rem;
      padding: 8px;

      &:focus,
      &:hover {
        background-color: ${({ theme }) => theme.colors.darkBlue};
        color: ${({ theme }) => theme.colors.dirtWhite};
      }

      &.custom-select__option--is-focused {
        background-color: ${({ theme }) => theme.colors.lightBlue};
        color: ${({ theme }) => theme.colors.dirtWhite};
      }

      &.custom-select__option--is-selected {
        background-color: ${({ theme }) => theme.colors.green};
        color: ${({ theme }) => theme.colors.white};
      }
    }

    .custom-select__placeholder {
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  
    .form-control.text-uppercase {
      ::placeholder {
        text-transform: none;
      }
    }

    .custom-select__dropdown-indicator {
      color: ${({ theme }) => theme.colors.lightBlue};
    }
    
    .custom-select__indicator-separator {
      background-color: ${({ theme }) => theme.colors.lightBlue};
    }

    .form-check-input:checked {
      background-color: ${({ theme }) => theme.colors.green};
      border-color: ${({ theme }) => theme.colors.green};
    }
  }

  .form-container {
    background-color: rgba(2, 34, 51, .95);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 1.5rem 2rem;
    border-radius: 0.375rem;
  }

  .form-header {
    padding: 0 0 1rem;
    color: ${({ theme }) => theme.colors.dirtWhite};
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media (min-width: 576px) {
      flex-wrap: nowrap;
    }

    .btn {
      background-color: ${({ theme }) => theme.colors.oblivionBlue};
      color: ${({ theme }) => theme.colors.dirtWhite};

      &:hover,
      &:active {
        border-color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  .form-icon {
    font-size: 8rem;
    text-align: center;
    background-color: transparent;
    border: none;
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }) => theme.colors.green};
    
    @media (min-width: 576px) {
      padding: 1rem 2.5rem;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .form-description {
    @media (min-width: 576px) {
      padding: 1rem 2.5rem;
    }

    .form-title {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.green};
      margin-bottom: 1rem;
    }

    .form-subtitle {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.ligthIndaco};
    }

    p {
      font-weight: 300;
      font-size: .85rem;
      
      @media (min-width: 576px) {
        font-size: 1rem;
      }
    }
  }

  .react-datepicker__navigation--years::before {
    border-color: ${({ theme }) => theme.colors.darkGrey};
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    display: block;
    height: 9px;
    left: 11px;
    position: absolute;
    width: 9px;
  }
  
  .react-datepicker__navigation--years-upcoming::before {
    top: 17px;
    transform: rotate(315deg);
  }
  
  .react-datepicker__navigation--years-previous::before {
    top: 6px;
    transform: rotate(135deg);
  }

  input.phone-number::-webkit-outer-spin-button,
  input.phone-number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.phone-number[type=number] {
    -moz-appearance: textfield;
  }
`

export default FormStyles