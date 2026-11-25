/**
 * we.TRUSS — builds the feedback questionnaire as a Google Form.
 *
 * How to use:
 * 1. Go to https://script.google.com  →  "New project"
 * 2. Delete everything in the editor, paste this whole file, click Save (💾)
 * 3. Click "Run" (▶) with "createWeTrussForm" selected
 * 4. Allow access when Google asks (it is your own script, creating a form in your own Drive)
 * 5. Open "Execution log" at the bottom: it shows the link to SEND and the link to EDIT the form
 *
 * Promoters and venues get promoter questions; artists and suppliers get artist/supplier questions;
 * everyone ends with the questions about the website and design.
 */
function createWeTrussForm() {
  const SITE = 'https://ubiquitous-chebakia-0c4571.netlify.app/';

  const form = FormApp.create('we.TRUSS — Feedback on our prototype');
  form.setDescription(
    'Hi! We are a student startup from Belgium building we.TRUSS: one shared space per event where the promoter, ' +
    'the artists and the suppliers each see exactly what concerns them, instead of scattered WhatsApps, emails and Excel sheets.\n\n' +
    '👉 Please try the website first (about 5 minutes):\n' + SITE + '\n\n' +
    'Quick tasks to try:\n' +
    '1. Log in as Promoter, open an event and post an update.\n' +
    '2. Switch role to Artist and confirm your gig.\n' +
    '3. Switch role to Supplier and flag a problem.\n\n' +
    'Then answer the questions below (about 5 minutes). All names and data on the website are fictional. Thank you!'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setConfirmationMessage('Thank you so much! Your feedback really helps us build we.TRUSS. 🙌');

  // ---------- Section 1: about you ----------
  const role = form.addMultipleChoiceItem()
    .setTitle('What best describes you?')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('How big are the events you usually work on?')
    .setChoiceValues(['Fewer than 100 visitors', '100 – 300 visitors', '300 – 1,000 visitors', 'More than 1,000 visitors'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('How do you coordinate events today? (tick all that apply)')
    .setChoiceValues(['WhatsApp', 'Email', 'Instagram DMs', 'Phone calls', 'Excel / Google Sheets', 'A dedicated tool or app'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Did you try the website before answering?')
    .setHelpText(SITE)
    .setChoiceValues(['Yes, all three roles (promoter, artist, supplier)', 'Yes, partly', 'Not yet'])
    .setRequired(true);

  // ---------- Section 2: promoters & venues ----------
  const promoterPage = form.addPageBreakItem()
    .setTitle('For promoters & venues')
    .setHelpText('Questions about using we.TRUSS to organise your events.');

  form.addScaleItem()
    .setTitle('How likely are you to use we.TRUSS for your next event?')
    .setBounds(1, 10)
    .setLabels('Not at all', 'Definitely')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Why that score?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would stop you from using it instead of WhatsApp, email or Excel?');

  form.addCheckboxItem()
    .setTitle('Who in your team would use it?')
    .setChoiceValues(['Just me', 'My co-organisers', 'Production / stage manager', 'Artist booker', 'Venue or bar staff'])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('Would the artists and suppliers you work with actually log in and use it?')
    .setChoiceValues(['Yes', 'Probably', 'Probably not', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('What would you expect to pay for this?')
    .setChoiceValues([
      'Nothing — it should be free',
      'Per event, around €5 – €10',
      'Around €15 per month',
      'Around €30 per month',
      'More than €30 per month'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("What's missing that you would need?");

  // ---------- Section 3: artists & suppliers ----------
  const artistPage = form.addPageBreakItem()
    .setTitle('For artists & suppliers')
    .setHelpText('Questions about receiving your gigs or jobs through we.TRUSS.');

  form.addMultipleChoiceItem()
    .setTitle('If a promoter used we.TRUSS for your gig or job, would you check it?')
    .setChoiceValues(['Yes, gladly', 'Probably', 'Only if the promoter insists', "No, I'd rather keep WhatsApp"])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Which information is most useful to you? (tick all that apply)')
    .setChoiceValues([
      'Set time / load-in & load-out times',
      'Arrival time & parking',
      'Fee',
      'Rider or equipment list status',
      'Contact person on site',
      'Latest updates and changes'
    ])
    .showOtherOption(true);

  form.addParagraphTextItem()
    .setTitle('What would make you ignore it or stop using it?');

  form.addParagraphTextItem()
    .setTitle("What's missing that you would need?");

  // ---------- Section 4: website & design (everyone) ----------
  const designPage = form.addPageBreakItem()
    .setTitle('The website & design')
    .setHelpText('Almost done! A few questions about the website itself: ' + SITE);

  form.addScaleItem()
    .setTitle('How easy was it to find your way around the website?')
    .setBounds(1, 5)
    .setLabels('Very hard', 'Very easy')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Where did you get stuck or confused, if anywhere?');

  form.addScaleItem()
    .setTitle('Does the look (colours, photos, fonts) fit the event scene?')
    .setBounds(1, 5)
    .setLabels('Not at all', 'Perfectly')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Does the name we.TRUSS work for you?')
    .setChoiceValues(['I love it', "It's OK", 'Not really'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Any comment on the name or the look?');

  form.addParagraphTextItem()
    .setTitle('Anything else you want to tell us?');

  form.addTextItem()
    .setTitle('Can we contact you for a short 10-minute follow-up chat? Leave your email (optional).');

  // ---------- Routing ----------
  // Section 1 sends each role to its own section
  role.setChoices([
    role.createChoice('Promoter / organiser', promoterPage),
    role.createChoice('Venue', promoterPage),
    role.createChoice('Artist (band, singer, DJ, performer…)', artistPage),
    role.createChoice('Supplier (sound & light, bar, security…)', artistPage),
    role.createChoice('Other', designPage)
  ]);
  // after the promoter section, skip the artist section and go straight to design
  // (setGoToPage on a page break = where to go after the section BEFORE it)
  artistPage.setGoToPage(designPage);

  // collect answers in a Google Sheet as well (handy for charts and slides)
  const sheet = SpreadsheetApp.create('we.TRUSS — Feedback answers');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('✅ Form created!');
  Logger.log('SEND this link to testers:  ' + form.getPublishedUrl());
  Logger.log('EDIT the form here:         ' + form.getEditUrl());
  Logger.log('Answers spreadsheet:        ' + sheet.getUrl());
}
