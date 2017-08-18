export default {

    transitions: [
      {
        from: "start",
        to: 'pastaType'
      },
      {
        from: "pastaType",
        to: 'flavor'
      },
      {
        from: "flavor",
        to: 'gluten',
        condition: 'scope.pastaType == "i"'
      },
      {
        from: "flavor",
        to: 'refri',
        condition: 'scope.pastaType == "n"'
      },
      {
        from: "gluten",
        to: 'contact'
      },
      {
        from: "refri",
        to: 'contact'
      },
      {
        from: 'contact',
        to: 'end'
      }
    ],

    things: [
      {
        key: 'pastaType',
        title: 'Olá, vamos pedir nossa pizza?!',
        immediate: true,
        fields: [
          {
            key: 'pastaType',
            type: 'radio',
            templateOptions: {
              label: 'Qual a sua massa?!',
              options: [{ 'name': 'Integral', 'value': 'i' }, { 'name': 'Normal', 'value': 'n' }],
              required: true
            }
          }
        ],
      },
      {
        key: 'flavor',
        title: 'E o sabor?!',
        fields: [
          {
            key: 'flavor',
            type: 'radio',
            templateOptions: {
              label: 'Sabor?!',
              options: [{ 'name': 'Peperonni', 'value': 'p' }, { 'name': 'Calabresa', 'value': 'c' }, { 'name': 'Mussarela', 'value': 'm' }],
              required: true
            }
          }
        ],
        tips: {
          image: 'http://ra-concierge.homolog.rhases.com.br/assets/images/atendente/priscila-cc8b3fcab5.jpg',
          values: [
            {
              text: 'Hummm... Peperonni é uma delícia!!!',
              condition: 'scope.flavor == "p"'
            },
            {
              text: 'Calabresa?!?! Que bom!!! Gosto muito.',
              condition: 'scope.flavor == "c"'
            },
            // {
            //   text: 'A mais autentica. ;)',
            //   condition: 'scope.flavor == "m"'
            // },
          ]
        },
      },
      {
        key: 'gluten',
        title: 'Se você for alergico!!!',
        fields: [
          {
            key: 'gluten',
            type: 'radio',
            templateOptions: {
              label: 'Gluten Free?!',
              options: [{ 'name': 'Sim', 'value': 'y' }, { 'name': 'Não', 'value': 'n' }],
              required: true
            }
          }
        ],
      },
      {
        key: 'refri',
        title: 'Vai um refri geladinho?!',
        fields: [
          {
            key: 'refri',
            type: 'radio',
            templateOptions: {
              label: 'Acompanha Refri?!',
              options: [{ 'name': 'Sim', 'value': 'y' }, { 'name': 'Não', 'value': 'n' }],
              required: true
            }
          }
        ],
      },
      {
        key: 'contact',
        title: 'E se a gente precisar bater um papo?!',
        fields: [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: 'Nome',
              required: true
            }
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              type: 'phone',
              label: 'Telefone',
              required: true
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              type: 'email',
              label: 'Email',
              required: true
            }
          }
        ],
      }
    ]
}
