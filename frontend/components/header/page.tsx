import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/images/logoTecEduca.png'

export default function Header() {
  return (
    <header className="flex items-center bg-[#1565C0] h-20 w-screen">
      <Link href="/"><Image src={Logo} alt='imagem de logo' /></Link>
    </header>
  );
}