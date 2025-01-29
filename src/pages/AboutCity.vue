<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md q-pb-sm">
      Sobre a <span class="text-accent">Cidade</span>
    </div>
    <div class="row justify-center q-col-gutter-sm">
      <div
        class="col-sm-12 col-xs-12 col-md-12"
        v-for="(about, index) in aboutCity"
        :key="index"
      >
        <q-expansion-item
          class="shadow-1 overflow-hidden shadow-dark"
          group="services"
          :key="about.name"
          style="border-radius: 10px"
          :label="about.name"
          header-class="bg-primary text-white text-h6"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section
              class="q-pt-sm text-body1"
              v-html="about.text"
            >
            </q-card-section>

            <q-card-section
              class="q-pt-sm text-body1"
            >
              <q-img :src="`/about-city/${about.image}`">
              </q-img>
            </q-card-section>

            <q-card-section class="q-pt-sm text-caption">
              <a :href="about.link" :class="$q.dark.isActive ? 'text-white link-custom' : 'text-primary'">
                Fonte: {{ about.link }}
              </a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAboutCity',
  data () {
    return {
      aboutCity: [
        {
          name: 'História',
          text: `O distrito de Beja foi o berço da colonização de Abaetetuba. Por volta de 1635, padres capuchinhos vindos do Convento do Una, em Belém, após percorrerem os rios da região, juntaram-se a uma aldeia de tribos indígenas nômades. O aglomerado foi chamado de "Samaúma" e, depois, batizado de "Beja" pelo governador Francisco Xavier de Mendonça Furtado.<br><br>

                  Embora Francisco de Azevedo Monteiro seja considerado, no imaginário popular, o fundador, pois chegou para tomar posse desse território como proprietário de uma sesmaria. Na beira do rio Maratauíra, num local protegido das marés pela ilha de Sirituba e nas proximidades do sítio Campompema e da Ilha da Pacoca, fundou um pequeno povoado, em 1724.<br><br>

                  O município de Abaetetuba foi desmembrado do território da capital do Estado, Belém, em 1880, de acordo com a Lei 973, de 23 de março, que também constituiu o município como autônomo.<br><br>

                  Um ano depois, em 1881, o presidente interino da Câmara em Belém, José Cardoso da Cunha Coimbra, instalou, no município, a Câmara Municipal de Abaeté. Por meio do Decreto-Lei 4 505, de 30 de dezembro de 1943, foi instituído o nome "Abaetetuba".`,
          link: 'https://www.abaetetuba.pa.gov.br/omunicipio.php'
        },
        {
          name: 'Cultura',
          text: `A cidade é uma surpresa agradável para aqueles que visitam pela primeira vez, simples em seu traçado urbano, é uma típica cidade da amazônia. Abaetetuba cresceu às margens do Rio Maratauíra (ou Meruú), que é um afluente do rio Tocantins. Seu povo é alegre, hospitaleiro e, acima de tudo apaixonada por sua terra. Abaetetuba é uma cidade que guarda tantas peculiaridades que a soma destes acaba gerando uma paixão pela terra natal, com tons de bairrismo. Seus poemas sobre "a terra maratuia " são verdadeiras declarações de amor.<br><br>
          A cidade tem um Patrimônio histórico, paisagísticos e culturais digno de ser visitado e admirado. Exemplos disso são as belas igrejas, algumas muito antigas como a Igreja de São Miguel Arcanjo, na centenária Vila de Beja e a Catedral de Nossa Senhora da Conceição, sede da Diocese de Abaetetuba, e outros mais moderno como a de Nossa Sra. de Nazaré e o Santuário de Nossa Senhorado Perpétuo Socorro, uma das maiores do estado.<br><br>
          No passado, o município ficou conhecido como a Terra da Cachaça, devido a próspera indústria de aguardente de cana localizado na época em Abaetetuba. Os Engenhos, no início do Século XX eram contados às dezenas, porem hoje só existe as ruínas e apenas uma pequena unidade fabril, o Engenho Pacheco, que produz perto de 1.000 litros por mês de uma excelente cachaça que é usufruída por um pequeno número de privilegiados dentro do próprio município. Esse símbolo local foi imortalizado nos versos de Ruy Barata ao cantar "só lembrar da mardita me lembrei de Abaeté".
          `,
          link: 'https://www.abaetetuba.pa.gov.br/omunicipio.php'
        },
        {
          name: 'Brasão',
          text: '',
          link: 'https://www.abaetetuba.pa.gov.br/omunicipio.php',
          image: 'brasao.jpeg'
        },
        {
          name: 'Bandeira',
          text: '',
          link: 'https://www.abaetetuba.pa.gov.br/omunicipio.php',
          image: 'bandeira.webp'
        }
      ]
    }
  }
}
</script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
