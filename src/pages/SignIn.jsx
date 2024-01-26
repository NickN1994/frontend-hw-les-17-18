import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import InputField from "../components/InputField";
import axios from "axios";
import {useForm} from "react-hook-form";

function SignIn() {

    const {login} = useContext(AuthContext);
    const form = useForm();
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;
    const [dataForm, setDataForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


       async function handleFormSubmit(data, event) {
        event.preventDefault();
           console.log("invoervelden:", data)
           try {
            setIsLoading(true);
            const result = await axios.post("http://localhost:3000/login", {
                ...data}
            );
               console.log(result.data.accessToken)
            setDataForm(result.data);
            login(result.data.accessToken);

        } catch (e) {
            console.error(e + "Inloggen mislukt");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField
              labelName="Email"
              inputType="email"
              id="email"
              validationRules={{
                  required: {
                      value: true,
                      message: "Email is verplicht om in te loggen"
                  },
                  validate: (value) => value.includes('@')}}
              register={register}
              errors={errors}
          />

          <InputField
              labelName="Wachtwoord"
              inputType="password"
              id="password"
              validationRules={{
                  required: {
                      value: true,
                      message: "Wachtwoord is verplicht"
                  }}}
              register={register}
              errors={errors}
          />

        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;