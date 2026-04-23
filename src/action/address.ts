'use server'

import db from "@/lib/db"
import { Address } from "@/type/global"

export async function addAddressAction(name: string, city: string, address: string, phone: string, userid: number) {
    await db`INSERT INTO addresses (name, city, address, phone, userid) VALUES (${name}, ${city}, ${address}, ${phone}, ${userid})`
    return {
        status: 200,
        body: 'add address success'
    }
}

export async function deleteAddressAction(id: number) {
    await db`DELETE FROM addresses WHERE id = ${id}`
    return {
        status: 200,
        body: 'delete address success'
    }
}

export async function AddressAction(userid: number) {
    const addresses = await db`SELECT * FROM addresses WHERE userid = ${userid}` as Address[]
    return {
        status: 200,
        body: 'update address success',
        data: addresses
    }
}