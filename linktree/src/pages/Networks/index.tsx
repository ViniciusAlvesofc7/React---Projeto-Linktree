import Header from "../../components/Header";
import Input from "../../components/Input";
import { useEffect, useState } from "react";

import { db } from "../../services/firebaseConnection"
import {
  setDoc,
  getDoc,
  doc
} from "firebase/firestore";

const Networks = () => {
  const [github, setGithub] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setGithub(snapshot.data()?.github);
            setInstagram(snapshot.data()?.instagram);
            setLinkedin(snapshot.data()?.linkedin);
          }
        })
        .catch((error) => {
          console.log("ERRO AO BUSCAR LINKS NO BANCO: ", error);
        })
    }

    loadLinks();
  }, [])

  function handleregister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      github: github,
      instagram: instagram,
      linkedin: linkedin,
    })
      .then(() => {
        console.log("Links salvos com sucesso!");
      })
      .catch((error) => {
        console.log("ERRO AO SALVAR LINK NO BANCO: ", error);
      })



  }


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white">
      <Header />

      <h1 className="text-2xl font-bold m-6">Suas Redes sociais</h1>

      <form className="flex flex-col justify-center gap-4 w-full max-w-xl" onSubmit={handleregister}>
        <div className="flex flex-col gap-2">
          <label >Link github</label>
          <Input
            type="url"
            placeholder="Digite a url do github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label >Link Instagram</label>
          <Input
            type="url"
            placeholder="Digite a url do instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label >Link linkedin</label>
          <Input
            type="url"
            placeholder="Digite a url do linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded-md mt-4">
          Salvar links
        </button>

      </form>
    </div>
  )
}

export default Networks
