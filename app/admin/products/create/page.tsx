import { FormInput } from '@/components/form/FormInput'
import { faker } from '@faker-js/faker'
import FormContainer from '@/components/form/FormContainer'
import { actionFunction } from '@/utils/actions'
import { PriceInput } from '@/components/form/PriceInput'
import { ImageInput } from '@/components/form/ImageInput'
import TextArea from '@/components/form/TextAreaInput'
import { CheckboxInput } from '@/components/form/CheckboxInput'
import { SubmitButton } from '@/components/form/Buttons'

function createPage() {
  const name = faker.commerce.productName()
  const company = faker.company.name()
  const description = faker.lorem.paragraph({ min: 5, max: 10 })
  return (
    <section>
      <h1 className="mb-5 text-xl font-normal">Sukurti naują produktą</h1>
      <div className="border p-5">
        <FormContainer action={actionFunction}>
          <div className="grid lg:grid-cols-2 gap-3">
            <FormInput
              name="name"
              type="text"
              label="Product name"
              defaultValue={name}
            />
            <FormInput
              name="company"
              type="text"
              label="Company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextArea
            name="description"
            defaultValue={description}
            labelText="Product description"
          />
          <div className="mt-5">
            <CheckboxInput name="featured" label="Rodyti pagrindiniame lange" />
          </div>
          <SubmitButton text="Sukurti prekę" className="mt-3" />
        </FormContainer>
      </div>
    </section>
  )
}
export default createPage
