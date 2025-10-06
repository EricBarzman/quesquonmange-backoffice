'use client';

import { auth } from "@/hooks/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form';
import './page.css';

interface Inputs {
  email: string;
  password: string;
}

export default function AuthPage() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      await auth(email, password);
      router.push('/');
      
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="auth__form__field"
          type="email"
          placeholder="example@gmail.com..."
          {...register("email")}
        />
        <input
          disabled={isAuthenticating}
          className="auth__form__field"
          type="password"
          placeholder="Mot de passe..."
          {...register("password")}
        />
        <input type="submit" className="auth__form__field" />
      </form>
    </div>
  )
}