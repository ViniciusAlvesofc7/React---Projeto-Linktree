import Social from "../../components/Social/index.tsx"
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useEffect, useState } from "react"

import { db } from "../../services/firebaseConnection.ts"
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from "firebase/firestore"


interface Linkprops {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

interface SocialLinkProps {
  github: string
  linkedin: string
  instagram: string
}

const Home = () => {
  const [links, setLinks] = useState<Linkprops[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef)
        .then((snapshot) => {
          let lista: Linkprops[] = [];

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
        })
        .catch((error) => {
          console.log("ERRO AO BUSCAR LINKS NO BANCO: ", error);
        })
    }

    loadLinks();

  }, [])

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setSocialLinks({
              github: snapshot.data()?.github,
              linkedin: snapshot.data()?.linkedin,
              instagram: snapshot.data()?.instagram,
            });
          }
        })
        .catch((error) => {
          console.log("ERRO AO BUSCAR LINKS SOCIAIS NO BANCO: ", error);
        })
    }

    loadSocialLinks();
  }, [links])



  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center w-full h-screen text-white">
      <h1 className="md:text-4xl text-3xl font-bold">Vinicius Alves</h1>
      <span className="text-sm mt-2.
        mb-3">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.bg }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none hover:scale-105 transition duration-300 ease ">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base md:text-lg font-medium" style={{ color: link.color }}>{link.name}</p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  )
}

export default Home
