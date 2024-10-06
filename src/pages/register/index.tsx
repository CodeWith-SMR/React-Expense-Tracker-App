import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase/googleAuth";
import { FieldValues, useForm } from "react-hook-form";
import { registerSchema } from "../../utils/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../utils/firebase/emailAuth";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = ({ email, password, name }: FieldValues) => {
    registerUser({ email, password, name })
      .then((user) => {
        alert(`${user.displayName} you have successfully registered!`);
        navigate("/");
      })
      .catch((error) => console.error("Error registering user: ", error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="register">
      <h3>Register account</h3>
      <label htmlFor="name">name</label>
      <input type="text" id="name" {...register("name")} />
      <p className="error">{errors.name && (errors.name.message as string)}</p>
      <label htmlFor="email">email</label>
      <input type="email" id="email" {...register("email")} />
      <p className="error">
        {errors.email && (errors.email.message as string)}
      </p>
      <label htmlFor="password">password</label>
      <input type="password" id="password" {...register("password")} />
      <p className="error">
        {errors.password && (errors.password.message as string)}
      </p>
      <label htmlFor="password">repeat password</label>
      <input
        type="password"
        id="password-repeat"
        {...register("passwordRepeat")}
      />
      <p className="error">
        {errors.passwordRepeat && (errors.passwordRepeat.message as string)}
      </p>

      <button type="submit">register</button>
      <button onClick={() => signInWithGoogle({ navigate })}>
        or sign in with Google
      </button>
      <p>
        Already have an account? <a href="/">Login here!</a>
      </p>
    </form>
  );
};

export default Register;
