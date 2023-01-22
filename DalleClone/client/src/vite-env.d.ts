/// <reference types="vite/client" />

type FormPost = {
  name: string,
  prompt: string,
  photo: string
};

type FormField = {
  labelName: string,
  type: string,
  name: string,
  placeholder: string,
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isSurpriseMe?: boolean,
  handleSurpriseMe?: () => void
};

type Post = {
  name: string,
  photo: string,
  prompt: string,
  _id: string
}
