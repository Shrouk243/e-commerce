import * as z from "zod"


export const checkoutSchema = z.object ({
    details :z.string().nonempty("Details can’t be empty"),
    phone :z.string().nonempty("Phone can’t be empty").regex(/^01[0125][0-9]{8}$/),
    city :z.string().nonempty("City can’t be empty"),
})


export type checkoutSchemaType = z.infer<typeof checkoutSchema>