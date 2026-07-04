import { useState, useEffect } from 'react';
import Header from '../../components/Header/index.tsx'
import Input from '../../components/Input/index.tsx';

import { FiTrash } from 'react-icons/fi';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection.ts';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

const Admin = () => {
  const [nameInput, setNameInput] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [textColorInput, setTextColorInput] = useState<string>('#f2f2f2');
  const [backgroundColorInput, setBackgroundColorInput] = useState<string>('#000000');

  const [links, setLinks] = useState<LinkProps[]>([]);


  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista: LinkProps[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        })
      })

      setLinks(lista);
    });

    return () => {
      unsub();
    }

  }, [])

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (nameInput === '' || urlInput === '') {
      alert('Preencha todos os campos!')
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
      .then(() => {
        console.log('Link cadastrado com sucesso!');
        setNameInput('');
        setUrlInput('');
        setTextColorInput('#f2f2f2');
        setBackgroundColorInput('#000000');
      })
      .catch((err) => {
        console.log("ERRO AO CADASTRAR LINK NO BANCO: ", err);
        console.log(err);
      })
  }

  async function handleDeleteLink(id: string) {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este link?');
    if (confirmDelete) {
      await deleteDoc(doc(db, "links", id))
        try {
          console.log('Link deletado com sucesso!');
        }
        catch (err) {
          console.log("ERRO AO DELETAR LINK NO BANCO: ", err);
        }
    }
  }


  return (
    <div className="flex flex-col items-center min-h-screen pb-7 p-3  bg-gray-900 transition-all duration-300">
      <Header />

      <form className="flex flex-col gap-2 w-full max-w-xl mt-3 mb-3" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL do link"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex gap-5 my-4">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2">Cor do Link</label>
            <Input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2">Fundo do Link</label>
            <Input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="flex flex-col justify-start gap-3 items-center mb-7 p-3 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2">Preview do Link</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{ color: textColorInput, backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium">{nameInput}</p>
            </article>
          </div>
        )}

        <button className="bg-blue-600 duration-300 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Cadastrar
        </button>

      </form>

      <h2 className="text-white font-bold text-2xl mb-3">
        Meus Links
      </h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-lg rounded px-2 py-3 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p className="font-medium">{link.name}</p>
          <button
            className="border border-dashed p-1 rounded border-white text-white hover:bg-white hover:text-red-600 duration-300"
            onClick={() => handleDeleteLink(link.id)}
          >
            <FiTrash size={20} />
          </button>
        </article>
      ))}
    </div>
  )
}

export default Admin
