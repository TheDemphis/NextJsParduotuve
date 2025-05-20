import {
  fetchAdminProdAction,
  updateProductImageAction,
  updateProductInfoAction,
} from '@/utils/actions'
import FormContainer from '@/components/form/FormContainer'
import { FormInput } from '@/components/form/FormInput'
import { PriceInput } from '@/components/form/PriceInput'
import TextArea from '@/components/form/TextAreaInput'
import { SubmitButton } from '@/components/form/Buttons'
import { CheckboxInput } from '@/components/form/CheckboxInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
async function editPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = await fetchAdminProdAction(id)
  const { name, price, description, featured, company } = product
  return (
    <section>
      <h1 className="mb-5 text-xl font-normal">Koreguoti produktą</h1>
      <div className="border p-5">
        <ImageInputContainer
          action={updateProductImageAction}
          image={product.image}
          name={name}
          text="Atnaujinti nuotrauką"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductInfoAction}>
          <div className="grid lg:grid-cols-2 gap-3">
            <input name="id" type="hidden" value={id} />
            <FormInput
              name="name"
              type="text"
              label="Prekės pavadinimas"
              defaultValue={name}
            />
            <FormInput
              name="company"
              label="Prekinis ženklas"
              defaultValue={company}
              type="text"
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextArea
            labelText="Aprašymas"
            name="description"
            defaultValue={description}
          />
          <div className="mt-5">
            <CheckboxInput
              name="featured"
              label="Rodyti pagrindiniame lange"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="Baigti redagavimą" className="mt-3" />
        </FormContainer>
      </div>
    </section>
  )
}
export default editPage
