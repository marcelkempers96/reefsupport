import company from '../data/company.json';
import { realUrl, hasConfirm } from './confirm';

/** schema.org Organization for home and about pages. */
export function organizationLd(site: URL) {
  return {
    '@type': 'Organization',
    '@id': new URL('/#organization', site).href,
    name: company.shortName,
    legalName: company.legalName,
    url: site.href,
    logo: new URL('/favicon.svg', site).href,
    description: company.shortDescription,
    foundingDate: company.founded,
    foundingLocation: 'Delft, Netherlands',
    ...(hasConfirm(company.email) ? {} : { email: company.email }),
    telephone: company.phone,
    identifier: { '@type': 'PropertyValue', propertyID: 'KvK', value: company.kvk },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Herengracht 551',
      postalCode: '1017 BW',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    },
    sameAs: company.social.map((s) => realUrl(s.url)).filter(Boolean),
  };
}
