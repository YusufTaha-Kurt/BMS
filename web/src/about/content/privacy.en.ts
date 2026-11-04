import type { PrivacyCopy } from './types.ts'

export const privacy: PrivacyCopy = {
  version: 'Version 1, 4 November 2026',
  intro: 'This notice explains how personal data collected through the collaboration proposal form on the BinBin Battery Intelligence website is processed. It is prepared under Article 10 of the Turkish Personal Data Protection Law No. 6698 and the Communiqué on the Procedures and Principles for the Obligation to Inform. The Turkish version prevails.',
  sections: [
    {
      title: 'Data controller',
      paragraphs: [
        'The data controller is OSTİM Technical University. The data is processed by the team of the BinBin Battery Intelligence project, which runs at the university. The university’s address and contact details are on its official website.',
      ],
    },
    {
      title: 'Personal data processed',
      items: [
        'Full name',
        'Organisation',
        'Email address',
        'Phone number, if given',
        'Proposal text and any information shared in it',
        'Form language, submission time and consent records',
      ],
      paragraphs: ['The IP address is used only during submission to prevent abuse and is not stored.'],
    },
    {
      title: 'Purposes',
      items: [
        'Assessing the collaboration proposal',
        'Replying to the sender and continuing the discussion',
        'Preventing abuse of the form and unwanted submissions',
        'Meeting legal obligations',
      ],
    },
    {
      title: 'Collection method and legal basis',
      paragraphs: [
        'The data is collected electronically and automatically through the form on the website.',
        'Assessing the proposal and contacting the sender rely on Article 5(2)(c) of the Law, as directly related to establishing a contract, and Article 5(2)(f), the data controller’s legitimate interest. Article 5(2)(ç) applies to legal obligations.',
      ],
    },
    {
      title: 'Transfers',
      paragraphs: [
        'Personal data is not sold or shared for marketing.',
        'Form submissions are processed on servers in the United States operated by Vercel Inc., which hosts the website. The submitted details are stored on servers in Frankfurt, Germany, operated by Supabase Inc., which provides the database. The data is therefore transferred abroad. The transfer relies on the explicit consent you give in the form under Article 9 of the Law.',
        'Data is disclosed to authorised public bodies only where the law requires it.',
      ],
    },
    {
      title: 'Retention',
      paragraphs: [
        'The data is kept for the duration of the project and for no more than two years. It is then deleted or anonymised. It is deleted earlier on request.',
      ],
    },
    {
      title: 'Your rights',
      lead: 'Under Article 11 of the Law, you can apply to the data controller to exercise the following rights.',
      items: [
        'Learn whether your personal data is processed',
        'Request information about the processing',
        'Learn the purpose of processing and whether the data is used accordingly',
        'Know the third parties in Türkiye or abroad to whom the data is transferred',
        'Request correction of incomplete or inaccurate data',
        'Request deletion or destruction under the conditions in Article 7 of the Law',
        'Request that correction, deletion or destruction is notified to third parties who received the data',
        'Object to a result against you that arises solely from automated analysis',
        'Claim compensation for damage caused by unlawful processing',
      ],
    },
    {
      title: 'Applications',
      paragraphs: [
        'Applications are sent in writing to OSTİM Technical University in line with the Communiqué on the Procedures and Principles of Application to the Data Controller. An application includes full name, signature, Turkish ID number or, for foreign nationals, nationality and passport or ID number, a postal address for notifications, email and phone if available, and the subject of the request.',
        'Applications are concluded free of charge within thirty days at the latest. If the process requires an additional cost, the fee set by the Board may be charged.',
      ],
    },
  ],
  universitySite: 'OSTİM Technical University official website',
}
