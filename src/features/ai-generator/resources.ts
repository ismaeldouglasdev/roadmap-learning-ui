export interface Resource {
  name: string;
  url: string;
  type: 'doc' | 'video' | 'course' | 'exercise' | 'article';
}

export interface SubjectArea {
  name: string;
  subAreas: string[];
  resources: Resource[];
}

export const resourceDatabase: Record<string, SubjectArea> = {
  programação: {
    name: 'Programação',
    subAreas: ['Frontend', 'Backend', 'Mobile', 'Data Science'],
    resources: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/pt-BR/', type: 'doc' },
      { name: 'W3Schools', url: 'https://www.w3schools.com/', type: 'course' },
      { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'course' },
      { name: 'Codecademy', url: 'https://www.codecademy.com/', type: 'course' },
      { name: 'Coursera', url: 'https://www.coursera.org/', type: 'course' },
      { name: 'edX', url: 'https://www.edx.org/', type: 'course' },
      { name: 'Platzi', url: 'https://platzi.com/', type: 'course' },
      { name: 'Rocketseat', url: 'https://www.rocketseat.com.br/', type: 'course' },
      { name: 'Alura', url: 'https://www.alura.com.br/', type: 'course' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org/', type: 'course' },
      { name: 'YouTube - Programação', url: 'https://www.youtube.com/c/CursoemV%C3%ADdeo', type: 'video' },
      { name: 'YouTube - Fabio Akita', url: 'https://www.youtube.com/c/FabioAkita', type: 'video' },
      { name: 'YouTube - Código Fonte TV', url: 'https://www.youtube.com/c/C%C3%B3digoFonteTV', type: 'video' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com/', type: 'article' },
      { name: 'Dev.to', url: 'https://dev.to/', type: 'article' },
      { name: 'GitHub Learning Lab', url: 'https://github.com/skills', type: 'exercise' },
      { name: 'Exercism', url: 'https://exercism.org/', type: 'exercise' },
      { name: 'LeetCode', url: 'https://leetcode.com/', type: 'exercise' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com/', type: 'exercise' },
      { name: 'Codewars', url: 'https://www.codewars.com/', type: 'exercise' },
    ],
  },
  design: {
    name: 'Design',
    subAreas: ['UI/UX', 'Design Gráfico', 'Motion Design'],
    resources: [
      { name: 'Figma Learn', url: 'https://www.figma.com/education/', type: 'course' },
      { name: 'Adobe XD', url: 'https://www.adobe.com/products/xd.html', type: 'doc' },
      { name: 'Figma', url: 'https://www.figma.com/', type: 'doc' },
      { name: 'Canva', url: 'https://www.canva.com/', type: 'doc' },
      { name: 'Dribbble', url: 'https://dribbble.com/', type: 'article' },
      { name: 'Behance', url: 'https://www.behance.net/', type: 'article' },
      { name: 'Awwwards', url: 'https://www.awwwards.com/', type: 'article' },
      { name: 'UX Collective', url: 'https://uxdesign.cc/', type: 'article' },
      { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/', type: 'doc' },
      { name: 'Material Design', url: 'https://material.io/design', type: 'doc' },
      { name: 'YouTube - Draw with Chris', url: 'https://www.youtube.com/c/DrawWithChris', type: 'video' },
      { name: 'YouTube - GFxtra', url: 'https://www.youtube.com/c/GFxtra', type: 'video' },
      { name: 'YouTube - Tutoriais de Design', url: 'https://www.youtube.com/c/TutoriaisdeDesign', type: 'video' },
      { name: 'Adobe Creative Cloud', url: 'https://www.adobe.com/br/creativecloud.html', type: 'course' },
      { name: 'Skillshare', url: 'https://www.skillshare.com/', type: 'course' },
      { name: 'Domestika', url: 'https://www.domestika.org/', type: 'course' },
      { name: 'Udemy Design', url: 'https://www.udemy.com/courses/design/', type: 'course' },
      { name: 'Creative Boom', url: 'https://www.creativeboom.com/', type: 'article' },
      { name: 'Design Milk', url: 'https://design-milk.com/', type: 'article' },
      { name: 'Typewolf', url: 'https://www.typewolf.com/', type: 'article' },
    ],
  },
  música: {
    name: 'Música',
    subAreas: ['Produção Musical', 'Teoria Musical', 'Instrumentos'],
    resources: [
      { name: 'YouTube - Canal do Filipe', url: 'https://www.youtube.com/c/CanaldoFilipe', type: 'video' },
      { name: 'YouTube - Flow', url: 'https://www.youtube.com/c/FlowMusic', type: 'video' },
      { name: 'YouTube - Music Radar', url: 'https://www.youtube.com/c/MusicRadar', type: 'video' },
      { name: 'YouTube - Piano com Carlos', url: 'https://www.youtube.com/c/PianocomCarlos', type: 'video' },
      { name: 'YouTube - Violão com João', url: 'https://www.youtube.com/c/Viol%C3%A3ocomJo%C3%A3o', type: 'video' },
      { name: 'YouTube - Bateria com Marco', url: 'https://www.youtube.com/c/BateracomMarco', type: 'video' },
      { name: 'Berklee Online', url: 'https://online.berklee.edu/', type: 'course' },
      { name: 'Coursera - Music Theory', url: 'https://www.coursera.org/browse/arts-and-humanities/music-and-art', type: 'course' },
      { name: 'Udemy - Music Production', url: 'https://www.udemy.com/courses/music-production/', type: 'course' },
      { name: 'Skillshare - Music', url: 'https://www.skillshare.com/browse/music', type: 'course' },
      { name: 'FL Studio', url: 'https://www.image-line.com/flstudio/', type: 'doc' },
      { name: 'Ableton Live', url: 'https://www.ableton.com/en/live/', type: 'doc' },
      { name: 'Logic Pro', url: 'https://www.apple.com/logic-pro/', type: 'doc' },
      { name: 'Pro Tools', url: 'https://www.avid.com/pro-tools', type: 'doc' },
      { name: 'MuseScore', url: 'https://musescore.org/', type: 'doc' },
      { name: 'Teoria.org', url: 'https://www.teoria.org/', type: 'doc' },
      { name: 'Music Theory.net', url: 'https://www.musictheory.net/', type: 'exercise' },
      { name: 'Teclado Virtual', url: 'https://www.musictheory.net/exercises/keyboard', type: 'exercise' },
      { name: 'SoundBetter', url: 'https://soundbetter.com/', type: 'article' },
      { name: 'Bedroom Producers Blog', url: 'https://bedroomproducersblog.com/', type: 'article' },
    ],
  },
  marketing: {
    name: 'Marketing Digital',
    subAreas: ['SEO', 'Redes Sociais', 'Publicidade Digital'],
    resources: [
      { name: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com/', type: 'course' },
      { name: 'HubSpot Academy', url: 'https://academy.hubspot.com/', type: 'course' },
      { name: 'Meta Blueprint', url: 'https://www.facebook.com/business/learn', type: 'course' },
      { name: 'Google Analytics Academy', url: 'https://analytics.google.com/analytics/academy/', type: 'course' },
      { name: 'Semrush Academy', url: 'https://www.semrush.com/academy/', type: 'course' },
      { name: 'Ahrefs Academy', url: 'https://www.ahrefs.com/academy', type: 'course' },
      { name: 'YouTube - Neil Patel', url: 'https://www.youtube.com/c/NeilPatel', type: 'video' },
      { name: 'YouTube - Marketing Digital', url: 'https://www.youtube.com/c/MarketingDigital', type: 'video' },
      { name: 'YouTube - Rock Content', url: 'https://www.youtube.com/c/RockContent', type: 'video' },
      { name: 'YouTube - Omnia MKT', url: 'https://www.youtube.com/c/OmniaMKT', type: 'video' },
      { name: 'Moz', url: 'https://moz.com/', type: 'doc' },
      { name: 'Search Engine Land', url: 'https://searchengineland.com/', type: 'article' },
      { name: 'Social Media Examiner', url: 'https://www.socialmediaexaminer.com/', type: 'article' },
      { name: 'ConversionXL', url: 'https://conversionxl.com/', type: 'article' },
      { name: 'Copyblogger', url: 'https://www.copyblogger.com/', type: 'article' },
      { name: 'AdEspresso', url: 'https://adespresso.com/', type: 'article' },
      { name: 'Hotmart', url: 'https://www.hotmart.com/', type: 'course' },
      { name: 'EDITION', url: 'https://www.edition.com.br/', type: 'article' },
      { name: ' Resultados Digitais', url: 'https://resultadosdigitais.com.br/', type: 'course' },
      { name: 'Youse', url: 'https://youse.com.br/', type: 'article' },
    ],
  },
  fotografia: {
    name: 'Fotografia',
    subAreas: ['Fotografia Básica', 'Edição de Imagens', 'Fotografia Comercial'],
    resources: [
      { name: 'YouTube - Manual da Fotografia', url: 'https://www.youtube.com/c/ManualdaFotografia', type: 'video' },
      { name: 'YouTube - Filippo', url: 'https://www.youtube.com/c/Filippo', type: 'video' },
      { name: 'YouTube - Pixtr', url: 'https://www.youtube.com/c/Pixtr', type: 'video' },
      { name: 'YouTube - Fotografia em Foco', url: 'https://www.youtube.com/c/FotografiaemFoco', type: 'video' },
      { name: 'Cambridge in Colour', url: 'https://www.cambridgeincolour.com/', type: 'course' },
      { name: 'Skillshare - Photography', url: 'https://www.skillshare.com/browse/photography', type: 'course' },
      { name: 'Udemy - Fotografia', url: 'https://www.udemy.com/courses/photography/', type: 'course' },
      { name: 'Domestika - Fotografia', url: 'https://www.domestika.org/pt-BR/courses/photography', type: 'course' },
      { name: 'Adobe Lightroom', url: 'https://www.adobe.com/products/photoshop-lightroom.html', type: 'doc' },
      { name: 'Adobe Photoshop', url: 'https://www.photoshop.com/', type: 'doc' },
      { name: 'Capture One', url: 'https://www.captureone.com/', type: 'doc' },
      { name: 'PetaPixel', url: 'https://petapixel.com/', type: 'article' },
      { name: 'Digital Photography Review', url: 'https://www.dpreview.com/', type: 'article' },
      { name: 'Fstoppers', url: 'https://fstoppers.com/', type: 'article' },
      { name: 'Phlearn', url: 'https://phlearn.com/', type: 'course' },
      { name: 'CreativeLive', url: 'https://www.creativelive.com/', type: 'course' },
      { name: 'ISO 1200', url: 'https://www.iso1200.com/', type: 'video' },
      { name: 'Tony Northrup', url: 'https://www.youtube.com/c/TonyNorthrup', type: 'video' },
      { name: 'Peter McKinnon', url: 'https://www.youtube.com/c/PeterMcKinnon', type: 'video' },
      { name: 'Mike Browne', url: 'https://www.youtube.com/c/mikebrowne', type: 'video' },
    ],
  },
  culinária: {
    name: 'Culinária',
    subAreas: ['Culinária Básica', 'Confeitaria', 'Gastronomia'],
    resources: [
      { name: 'YouTube - Tudo Gostoso', url: 'https://www.youtube.com/c/TudoGostoso', type: 'video' },
      { name: 'YouTube - Panelinha', url: 'https://www.youtube.com/c/Panelinha', type: 'video' },
      { name: 'YouTube - Receitas da Happy', url: 'https://www.youtube.com/c/ReceitasdaHappy', type: 'video' },
      { name: 'YouTube - Cozinha Practica', url: 'https://www.youtube.com/c/CozinhaPr%C3%A1tica', type: 'video' },
      { name: 'YouTube - Gastronomia com Paixão', url: 'https://www.youtube.com/c/GastronomiacomPaix%C3%A3o', type: 'video' },
      { name: 'Chefclub', url: 'https://chefclub.com.br/', type: 'video' },
      { name: 'Allrecipes', url: 'https://www.allrecipes.com/', type: 'doc' },
      { name: 'Cookpad', url: 'https://www.cookpad.com/br', type: 'doc' },
      { name: 'Wikicooks', url: 'https://pt.wikibooks.org/wiki/Categoria:Receitas', type: 'doc' },
      { name: 'Gastronomia - USP', url: 'https://www.usp.br/ga/', type: 'doc' },
      { name: 'Escola de Couchef', url: 'https://www.escoladecouchef.com.br/', type: 'course' },
      { name: 'Institut Paul Bocuse', url: 'https://www.institutpaulbocuse.com.br/', type: 'course' },
      { name: 'Senac', url: 'https://www.sp.senac.br/cursos/livre/gastronomia', type: 'course' },
      { name: 'Udemy - Culinária', url: 'https://www.udemy.com/courses/cooking/', type: 'course' },
      { name: 'Skillshare - Cooking', url: 'https://www.skillshare.com/browse/cooking', type: 'course' },
      { name: 'Le Cordon Bleu', url: 'https://www.lecordonbleu.edu.br/', type: 'course' },
      { name: 'Biscuit Academy', url: 'https://biscuitacademy.com.br/', type: 'course' },
      { name: 'Confeitaria Online', url: 'https://confeitariaonline.com.br/', type: 'course' },
      { name: 'Gastronomia Brasil', url: 'https://gastronomiabrasil.com/', type: 'article' },
      { name: 'Comida e Política', url: 'https://comidaepolitica.com.br/', type: 'article' },
    ],
  },
  moda: {
    name: 'Moda',
    subAreas: ['Design de Moda', 'Costura', 'Negócios da Moda'],
    resources: [
      { name: 'YouTube - Fashion Fundamentals', url: 'https://www.youtube.com/c/FashionFundamentals', type: 'video' },
      { name: 'YouTube - Costura Simple', url: 'https://www.youtube.com/c/CosturaSimples', type: 'video' },
      { name: 'YouTube - Moda e Estilo', url: 'https://www.youtube.com/c/ModaeEstilo', type: 'video' },
      { name: 'YouTube - Atelier de Costura', url: 'https://www.youtube.com/c/AtelierdeCostura', type: 'video' },
      { name: 'Skillshare - Fashion', url: 'https://www.skillshare.com/browse/fashion', type: 'course' },
      { name: 'Domestika - Moda', url: 'https://www.domestika.org/pt-BR/courses/fashion', type: 'course' },
      { name: 'Coursera - Fashion', url: 'https://www.coursera.org/browse/arts-and-humanities/fashion', type: 'course' },
      { name: 'UAL Short Courses', url: 'https://www.arts.ac.uk/short-courses', type: 'course' },
      { name: 'IFM - Institut Français de la Mode', url: 'https://www.ifm-paris.fr/', type: 'course' },
      { name: 'Parsons Online', url: 'https://www.newschool.edu/parsons/online/', type: 'course' },
      { name: 'Vogue', url: 'https://www.vogue.com/', type: 'article' },
      { name: 'Harper\'s Bazaar', url: 'https://www.harpersbazaar.com/', type: 'article' },
      { name: 'Fashionista', url: 'https://fashionista.com/', type: 'article' },
      { name: 'Business of Fashion', url: 'https://www.businessoffashion.com/', type: 'article' },
      { name: 'Fedrigoni', url: 'https://www.fedrigoni.com/', type: 'article' },
      { name: 'Threads Magazine', url: 'https://www.threadsmagazine.com/', type: 'article' },
      { name: 'Sewing Pattern Guide', url: 'https://sewingpatternsolutions.com/', type: 'doc' },
      { name: 'Burda Style', url: 'https://www.burdastyle.com/', type: 'doc' },
      { name: 'Simplicity Patterns', url: 'https://simplicity.com/', type: 'doc' },
      { name: 'McCall\'s Patterns', url: 'https://mccallpattern.com/', type: 'doc' },
    ],
  },
  negócios: {
    name: 'Negócios',
    subAreas: ['Empreendedorismo', 'Gestão de Empresas', 'Finanças Pessoais'],
    resources: [
      { name: 'SEBRAE', url: 'https://www.sebrae.com.br/', type: 'course' },
      { name: 'YouTube - Gestão', url: 'https://www.youtube.com/c/Gestao', type: 'video' },
      { name: 'YouTube - Empreendedor', url: 'https://www.youtube.com/c/Empreendedor', type: 'video' },
      { name: 'YouTube - Nubank', url: 'https://www.youtube.com/c/Nubank', type: 'video' },
      { name: 'YouTube - Conquer', url: 'https://www.youtube.com/c/Conquer', type: 'video' },
      { name: 'YouTube - Hashtag Programação', url: 'https://www.youtube.com/c/HashtagPrograma%C3%A7%C3%A3o', type: 'video' },
      { name: 'Coursera - Business', url: 'https://www.coursera.org/browse/business', type: 'course' },
      { name: 'EDP University', url: 'https://www.edx.org/course/subject/business', type: 'course' },
      { name: 'Fundação Getúlio Vargas', url: 'https://www.fgv.br/', type: 'course' },
      { name: 'Brazilian School of Public and Business Administration', url: 'https://ebape.fgv.br/', type: 'course' },
      { name: 'HubSpot - Sales', url: 'https://www.hubspot.com/products/sales', type: 'doc' },
      { name: 'Rock Content', url: 'https://rockcontent.com/', type: 'course' },
      { name: 'Resultados Digitais', url: 'https://resultadosdigitais.com.br/', type: 'course' },
      { name: 'Y Combinator', url: 'https://www.ycombinator.com/', type: 'article' },
      { name: 'Startup Notes', url: 'https://startupnotes.substack.com/', type: 'article' },
      { name: 'Exponential View', url: 'https://exponentialview.co/', type: 'article' },
      { name: 'Andre Durao', url: 'https://www.andredurao.com/', type: 'article' },
      { name: 'GV Smart', url: 'https://www.gvsmart.com.br/', type: 'course' },
      { name: 'CURSOLIVE', url: 'https://www.cursolive.com.br/', type: 'course' },
      { name: 'Academy for Entrepreneurs', url: 'https://academyforentrepreneurs.com/', type: 'course' },
    ],
  },
  idiomas: {
    name: 'Idiomas',
    subAreas: ['Inglês', 'Espanhol', 'Outros Idiomas'],
    resources: [
      { name: 'Duolingo', url: 'https://www.duolingo.com/', type: 'course' },
      { name: 'Babbel', url: 'https://www.babbel.com/', type: 'course' },
      { name: 'Busuu', url: 'https://www.busuu.com/', type: 'course' },
      { name: 'Memrise', url: 'https://www.memrise.com/', type: 'course' },
      { name: 'Rosetta Stone', url: 'https://www.rosettastone.com/', type: 'course' },
      { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', type: 'course' },
      { name: 'VOA Learning English', url: 'https://learningenglish.voanews.com/', type: 'course' },
      { name: 'YouTube - English with Lucy', url: 'https://www.youtube.com/c/EnglishWithLucy', type: 'video' },
      { name: 'YouTube - Rachel\'s English', url: 'https://www.youtube.com/c/RachelsEnglish', type: 'video' },
      { name: 'YouTube - EnglishAddict with MrDuncan', url: 'https://www.youtube.com/c/EnglishAddictwithMrDuncan', type: 'video' },
      { name: 'YouTube - Treehouse', url: 'https://www.youtube.com/c/Treehouse', type: 'video' },
      { name: 'YouTube - Portuguese for Beginners', url: 'https://www.youtube.com/c/PortugueseforBeginners', type: 'video' },
      { name: 'Cambridge Dictionary', url: 'https://dictionary.cambridge.org/', type: 'doc' },
      { name: 'Merriam-Webster', url: 'https://www.merriam-webster.com/', type: 'doc' },
      { name: 'WordReference', url: 'https://www.wordreference.com/', type: 'doc' },
      { name: 'Grammarly', url: 'https://www.grammarly.com/', type: 'doc' },
      { name: 'Italki', url: 'https://www.italki.com/', type: 'course' },
      { name: 'Preply', url: 'https://preply.com/', type: 'course' },
      { name: 'Clozemaster', url: 'https://www.clozemaster.com/', type: 'exercise' },
      { name: 'LinguaLeo', url: 'https://lingualeo.com/', type: 'exercise' },
    ],
  },
};

export function getSubjectResources(subject: string): Resource[] {
  const normalized = subject.toLowerCase().trim();
  
  // Direct match
  if (resourceDatabase[normalized]) {
    return resourceDatabase[normalized].resources;
  }
  
  // Partial match
  for (const key of Object.keys(resourceDatabase)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return resourceDatabase[key].resources;
    }
  }
  
  // Fallback to programming if no match
  return resourceDatabase['programação'].resources;
}

export function getSubjectSubAreas(subject: string): string[] {
  const normalized = subject.toLowerCase().trim();
  
  if (resourceDatabase[normalized]) {
    return resourceDatabase[normalized].subAreas;
  }
  
  for (const key of Object.keys(resourceDatabase)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return resourceDatabase[key].subAreas;
    }
  }
  
  return resourceDatabase['programação'].subAreas;
}
