"use server"
import db from "@/lib/db"
import jwt, {JwtPayload} from "jsonwebtoken";
import { cookies } from "next/headers";
const SECRET_KEY = "AIOJDOISABOCBOISJAOIDJWOajdoajda";
export async function loginAction(email: string, password: string) {
  const result = await db`SELECT * FROM users WHERE email = ${email} AND password = ${password}`
  const cookie = await cookies();
  if (result.length === 0) {
    return {
      status: 401,
      body: 'login failed'
    }
  } else {
    const token = jwt.sign({ userid: result[0].id, email, name: result[0].name }, SECRET_KEY, { expiresIn: '1h' });
    cookie.set('token', token, { path: '/', maxAge: 60 * 60 * 24 });
    return {
      status: 200,
      body: 'login success'
    }
  }
}

export async function registerAction(email: string, name: string, password: string) {
  const result = await db`SELECT * FROM users WHERE email = ${email}`
  if (result.length > 0) {
    return {
      status: 401,
      body: 'register failed'
    }
  } else {
    await db`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${password})`
    return {
      status: 200,
      body: 'register success'
    }
  }
}

export async function logoutAction() {
  const cookie = await cookies();
  cookie.delete('token');
  return {
    status: 200,
    body: 'logout success'
  }
}

export async function authAction() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  if (!token) {
    return {
      status: 401,
      body: 'no token'
    };
  }
  try {
    const result = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return {
      status: 200,
      body: "auth success",
      data: result
    };
  } catch (error) {
    return {
      status: 401,
      body: 'invalid token' + error
    };
  }

}