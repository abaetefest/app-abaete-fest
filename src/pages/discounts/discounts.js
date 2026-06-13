import AmazonProducts from 'src/components/AmazonProducts.vue'

export default {
  name: 'DiscountsPage',
  components: { AmazonProducts },
  data() {
    return {
      products: [
        {
          href: 'https://amzn.to/4uvaYyH',
          image: '/advertising/pulse.jpg',
          alt: 'Headphone HB200 Bluetooth Branco Pulse - PH431',
          name: 'Headphone HB200 Bluetooth Branco Pulse - PH431',
          price: 'R$111,06',
          bannerEvent: 'Amazon Pulse HB200 Banner Clicked - Discounts',
          buttonEvent: 'Amazon Pulse HB200 Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4vCoi5i',
          image: '/advertising/iphone_15_128gb.jpg',
          alt: 'Apple iPhone 15 128GB Preto',
          name: 'Apple iPhone 15 (128 GB) — Preto',
          price: 'R$4.094,00',
          bannerEvent: 'Amazon iPhone15 Banner Clicked - Discounts',
          buttonEvent: 'Amazon iPhone15 Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/3SrUn1j',
          image: '/advertising/iphone.png',
          alt: 'Apple iPhone 16e 128GB',
          name: 'Apple iPhone 16e de 128 GB',
          price: '12x de R$ 312,49',
          bannerEvent: 'Amazon iPhone16e Banner Clicked - Discounts',
          buttonEvent: 'Amazon iPhone16e Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/43XF9nh',
          image: '/advertising/tv_britania.jpg',
          alt: 'Smart TV 40" Britânia Roku TV LED Dolby Audio',
          name: 'Smart TV 40" Britânia Roku TV LED Dolby Audio',
          price: 'R$1.245,90',
          bannerEvent: 'Amazon TVBritania Banner Clicked - Discounts',
          buttonEvent: 'Amazon TVBritania Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/3POkY8c',
          image: '/advertising/galaxy_a17.jpg',
          alt: 'Samsung Galaxy A17 128GB',
          name: 'Samsung Galaxy A17, 128GB, 4GB, 50MP',
          price: 'R$799,90',
          bannerEvent: 'Amazon GalaxyA17 Banner Clicked - Discounts',
          buttonEvent: 'Amazon GalaxyA17 Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/3QxWbFw',
          image: '/advertising/galaxy_fit3.jpg',
          alt: 'Samsung Galaxy Fit3 Grafite',
          name: 'Smartwatch Samsung Galaxy Fit3 Display 1.6" Grafite',
          price: 'R$234,66',
          bannerEvent: 'Amazon GalaxyFit3 Banner Clicked - Discounts',
          buttonEvent: 'Amazon GalaxyFit3 Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/43pZzVT',
          image: '/advertising/Giorgio.jpg',
          alt: 'My Way Giorgio Armani',
          name: 'My Way Giorgio Armani',
          price: 'Por R$310,17',
          originalPrice: 'R$559,00',
          bannerEvent: 'Amazon Giorgio Banner Clicked - Discounts',
          buttonEvent: 'Amazon Giorgio Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4fBxjqM',
          image: '/advertising/meias_lupo.jpg',
          alt: 'Kit 6 Pares Meias Lupo Cano Médio',
          name: 'Kit 6 Pares Meias Lupo Cano Médio Algodão — Sortido',
          price: 'R$53,40',
          bannerEvent: 'Amazon MeiasLupo Banner Clicked - Discounts',
          buttonEvent: 'Amazon MeiasLupo Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4unS7FS',
          image: '/advertising/mbox.jpg',
          alt: 'MBOX Kit Torcedor Brasil Copa 2026',
          name: 'MBOX Kit Torcedor Brasil Copa 2026 — 12 Peças',
          price: 'R$40,49',
          bannerEvent: 'Amazon MboxCopa Banner Clicked - Discounts',
          buttonEvent: 'Amazon MboxCopa Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4gan2BS',
          image: '/advertising/camiseta_dry.jpg',
          alt: 'Camiseta Dry Brasil',
          name: 'Camiseta Dry Brasil',
          price: 'R$55,90',
          bannerEvent: 'Amazon CamisetaDry Banner Clicked - Discounts',
          buttonEvent: 'Amazon CamisetaDry Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/43lHf0d',
          image: '/advertising/pote_bambu.jpg',
          alt: 'Kit 4 Potes Herméticos de Vidro 450ml com Tampa de Bambu',
          name: 'Kit 4 Potes Herméticos de Vidro 450ml com Tampa de Bambu',
          price: 'R$29,99',
          bannerEvent: 'Amazon PoteBambu Banner Clicked - Discounts',
          buttonEvent: 'Amazon PoteBambu Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4gea2v9',
          image: '/advertising/cicaplast.jpg',
          alt: 'La Roche-Posay Cicaplast Baume B5+',
          name: 'La Roche-Posay Cicaplast Baume B5+ Cuidado Multirreparador Calmante',
          price: 'R$70,99',
          bannerEvent: 'Amazon Cicaplast Banner Clicked - Discounts',
          buttonEvent: 'Amazon Cicaplast Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4gfkrXn',
          image: '/advertising/argan.jpg',
          alt: 'Argan Óleo Reparador 50ml Lola Cosmetics',
          name: 'Argan Óleo Reparador 50ml - Lola Cosmetics',
          price: 'R$15,90',
          bannerEvent: 'Amazon Argan Banner Clicked - Discounts',
          buttonEvent: 'Amazon Argan Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4fKrIyj',
          image: '/advertising/mizunoneo2.jpg',
          alt: 'Tênis de Corrida Mizuno Neo Vortex',
          name: 'Tênis de Corrida Mizuno Neo Vortex',
          price: 'R$397,99',
          bannerEvent: 'Amazon Mizuno Neo Vortex Banner Clicked - Discounts',
          buttonEvent: 'Amazon Mizuno Neo Vortex Button Clicked - Discounts'
        },
        {
          href: 'https://amzn.to/4aOXmr1',
          image: '/advertising/modus.jpg',
          alt: 'MODUS Garrafa Térmica Esportiva De Aço Inoxidável 950ML',
          name: 'MODUS Garrafa Térmica Esportiva De Aço Inoxidável Com Isolamento A Vácuo De 950ML',
          price: 'R$78,99',
          bannerEvent: 'Amazon Modus Garrafa Banner Clicked - Discounts',
          buttonEvent: 'Amazon Modus Garrafa Button Clicked - Discounts'
        }
      ]
    }
  }
}
