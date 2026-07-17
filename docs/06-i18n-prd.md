# Internationalization Product Requirements
# QUNARA INTERNATIONALIZATION (i18n)

Version 1.0

---

## Goal

Qunara must support multiple languages.

Version 1 supports:

- English
- Vietnamese

The architecture must allow future support for:

- Japanese
- Korean
- Chinese
- French
- German

without changing page code.

---

## Philosophy

English and Vietnamese are equal.

Vietnamese is NOT translated from English.

English is NOT translated from Vietnamese.

Each language is first-class.

Each article is independently written.

The UI uses translation dictionaries.

Educational content uses localized articles.

---

## URL Structure

/en

/vi

Examples

/en

/en/learn

/en/explore

/en/about

/en/community

---

/vi

/vi/hoc

/vi/kham-pha

/vi/gioi-thieu

/vi/cong-dong

Vietnamese URLs should use natural Vietnamese slugs where practical.

Example

/en/explore/many-worlds

↓

/vi/kham-pha/tam-thien-dai-thien-the-gioi

---

## Navigation

Add language selector.

Desktop

🌍 English ▼

Mobile

Language item inside menu.

Languages

🇺🇸 English

🇻🇳 Tiếng Việt

---

## Behavior

When user changes language

Remain on the same page.

Example

/en/about

↓

/vi/gioi-thieu

If page doesn't exist

Go to language homepage.

---

## Remember language

Priority

1 Browser language

2 Saved cookie

3 English

---

## UI Translation

Everything must translate.

Navigation

Footer

Buttons

Forms

Validation

Search

Breadcrumb

404

Metadata

Loading

Errors

Empty states

---

## Content

Articles are NOT automatically translated.

Each language owns its own content.

Directory

content/

    en/

    vi/

Each article

title

summary

body

references

reflection

practice

independent.

---

## Translation Dictionary

messages/

    en.json

    vi.json

Example

Learn

↓

Học

Explore

↓

Khám phá

Practice

↓

Thực hành

About

↓

Giới thiệu

Community

↓

Cộng đồng

---

## SEO

Generate

hreflang

canonical

metadata

OpenGraph

Twitter

for every language.

---

## Accessibility

Language selector

keyboard accessible

screen reader friendly

mobile friendly

---

## Future

Architecture should support

RTL languages

without redesign.

---

## Success

Adding a new language should require only

messages/

content/

metadata/

No component rewrites.
