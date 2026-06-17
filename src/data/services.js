// 8 services. `icon` uses iconify lucide names. Each has SEO + FAQ content used
// to generate /services/<slug> pages with Service + FAQPage JSON-LD.
export const services = [
  {
    slug: 'eye-exams',
    title: 'Comprehensive Eye Exams',
    shortTitle: 'Eye Exams',
    icon: 'lucide:eye',
    duration: '45-60 min',
    forWho: 'Everyone 6 months and older',
    summary:
      'Complete vision and eye-health assessment using advanced diagnostic technology.',
    description:
      'A comprehensive eye exam at Eye Q Hawaii goes far beyond reading a chart. Dr. Fernandez evaluates how clearly you see, how your eyes work together, and the health of the structures inside and around your eyes, catching issues like glaucoma, diabetes, and macular changes early, often before you notice symptoms.',
    details: [
      'Visual acuity & refraction',
      'Eye pressure measurement',
      'Retinal imaging',
      'Binocular vision assessment',
      'Personalized treatment plan',
    ],
    image:
      'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1200&q=80',
    seoTitle: 'Comprehensive Eye Exams in Hilo, HI | Eye Q Hawaii',
    seoDescription:
      'Comprehensive eye exams in Hilo on the Big Island. Advanced diagnostics, retinal imaging, and personalized care from Dr. Caron Fernandez, O.D. Book today.',
    faqs: [
      {
        q: 'How often should I get an eye exam?',
        a: 'Most adults should have a comprehensive eye exam every one to two years, and annually if you wear contacts, have diabetes, or are over 60. Children should be examined regularly as their eyes develop.',
      },
      {
        q: 'What is included in a comprehensive eye exam?',
        a: 'Your exam includes visual acuity testing, refraction for glasses or contacts, eye-pressure measurement, retinal imaging, and a full eye-health evaluation to screen for conditions like glaucoma and diabetic eye disease.',
      },
      {
        q: 'How long does an eye exam take?',
        a: 'A comprehensive exam typically takes 45 to 60 minutes, depending on the testing required.',
      },
    ],
  },
  {
    slug: 'glasses-contacts',
    title: 'Prescription Glasses & Contact Lens Fittings',
    shortTitle: 'Glasses & Contacts',
    icon: 'lucide:glasses',
    duration: '30 min fitting',
    forWho: 'Anyone needing vision correction',
    summary:
      'Expert fitting for prescription glasses and contact lenses with a premium frame selection.',
    description:
      'From your first pair to your perfect fit, our optical team helps you find eyewear that works for your prescription, your lifestyle, and your style. We fit standard and specialty contact lenses, including multifocal, astigmatism (toric), and dry-eye-friendly options.',
    details: [
      'Frame styling consultation',
      'Lens customization options',
      'Contact lens trials & training',
      'Progressive & multifocal lenses',
      'Sports & specialty lenses',
    ],
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80',
    seoTitle: 'Glasses & Contact Lens Fittings in Hilo | Eye Q Hawaii',
    seoDescription:
      'Prescription glasses and contact lens fittings in Hilo, Hawaii. Premium frames, progressive lenses, and expert contact fittings at Eye Q Hawaii.',
    faqs: [
      {
        q: 'Can I get contacts if I have astigmatism?',
        a: 'Yes. Toric contact lenses are designed specifically for astigmatism, and we also fit multifocal and specialty lenses. A contact lens fitting ensures the right lens for your eyes.',
      },
      {
        q: 'Do I need a separate appointment for a contact lens fitting?',
        a: 'A contact lens fitting is in addition to a comprehensive eye exam, since it measures the shape of your eye and evaluates lens performance. We can often coordinate both in one visit.',
      },
    ],
  },
  {
    slug: 'pediatric-eye-care',
    title: 'Pediatric Eye Care',
    shortTitle: 'Pediatric Care',
    icon: 'lucide:baby',
    duration: '30-45 min',
    forWho: 'Infants through teens',
    summary: 'Gentle, child-friendly exams that catch vision problems early.',
    description:
      "Children's eyes are still developing, and undetected vision problems can affect learning and confidence. Dr. Fernandez provides warm, patient, kid-friendly exams that screen for nearsightedness, lazy eye, focusing problems, and more, and offers myopia management to slow progression.",
    details: [
      'Early-detection screening',
      'Learning-related vision testing',
      'Myopia management',
      'Child-friendly environment',
      'School vision requirements',
    ],
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
    seoTitle: 'Pediatric Eye Care & Kids Eye Exams in Hilo | Eye Q Hawaii',
    seoDescription:
      "Children's eye exams and pediatric eye care in Hilo, Hawaii. Gentle, kid-friendly exams and myopia management from Dr. Caron Fernandez, O.D.",
    faqs: [
      {
        q: 'At what age should my child have their first eye exam?',
        a: "A first comprehensive eye exam is recommended around 6 months of age, again before starting school, and regularly thereafter. Early exams catch problems that vision screenings can miss.",
      },
      {
        q: 'What is myopia management?',
        a: 'Myopia management uses specialized lenses, contacts, or treatments to slow how quickly a child becomes nearsighted, reducing the risk of eye health problems later in life.',
      },
    ],
  },
  {
    slug: 'diabetic-eye-exams',
    title: 'Diabetic Eye Exams',
    shortTitle: 'Diabetic Eye Care',
    icon: 'lucide:heart-pulse',
    duration: '45-60 min',
    forWho: 'All diabetic patients',
    summary:
      'Critical monitoring for diabetic retinopathy and related conditions.',
    description:
      'Diabetes is a leading cause of preventable blindness, and damage often begins before any change in vision. A dilated diabetic eye exam lets Dr. Fernandez examine the retina and blood vessels in detail, detect diabetic retinopathy early, and coordinate care with your physician.',
    details: [
      'Dilated eye examination',
      'Retinal photography',
      'Blood-vessel assessment',
      'Annual monitoring',
      'Coordination with your physician',
    ],
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
    seoTitle: 'Diabetic Eye Exams in Hilo, HI | Eye Q Hawaii',
    seoDescription:
      'Diabetic eye exams and retinopathy screening in Hilo, Hawaii. Protect your vision with annual dilated exams from Dr. Caron Fernandez, O.D.',
    faqs: [
      {
        q: 'How often should diabetics get an eye exam?',
        a: 'People with diabetes should have a dilated eye exam at least once a year, more often if retinopathy or other changes are found. Early detection is key to preventing vision loss.',
      },
      {
        q: 'Can an eye exam detect diabetes?',
        a: 'Yes. Changes in the retina and its blood vessels can reveal diabetes or pre-diabetes, sometimes before a formal diagnosis, which is one reason regular eye exams matter.',
      },
    ],
  },
  {
    slug: 'glaucoma-cataract',
    title: 'Glaucoma & Cataract Screenings',
    shortTitle: 'Glaucoma & Cataract',
    icon: 'lucide:scan-eye',
    duration: '30-45 min',
    forWho: 'Age 40+ or those with family history',
    summary:
      'Early detection and management of glaucoma, cataracts, and macular degeneration.',
    description:
      'Glaucoma is called the "silent thief of sight" because it causes no symptoms until vision is already lost. Eye Q Hawaii uses OCT imaging, visual-field testing, and pressure monitoring to detect glaucoma, cataracts, and macular degeneration early, and to coordinate surgical referrals when needed.',
    details: [
      'Visual field testing',
      'OCT imaging',
      'Eye-pressure monitoring',
      'Cataract evaluation',
      'Surgery referrals & co-management',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    seoTitle: 'Glaucoma & Cataract Screening in Hilo | Eye Q Hawaii',
    seoDescription:
      'Glaucoma testing, cataract evaluation, and macular degeneration screening in Hilo, Hawaii. Advanced OCT imaging at Eye Q Hawaii.',
    faqs: [
      {
        q: 'What are the early signs of glaucoma?',
        a: 'Glaucoma usually has no early symptoms, which is why routine screening with eye-pressure and OCT testing is essential, especially after age 40 or with a family history.',
      },
      {
        q: 'Do you remove cataracts?',
        a: 'Cataract removal is a surgical procedure. Dr. Fernandez diagnoses cataracts, monitors their progression, refers you to a trusted surgeon when appropriate, and provides pre- and post-operative care.',
      },
    ],
  },
  {
    slug: 'dry-eye-treatment',
    title: 'Dry Eye Treatment',
    shortTitle: 'Dry Eye',
    icon: 'lucide:droplets',
    duration: 'Varies',
    forWho: 'Anyone with irritation or discomfort',
    summary:
      "Advanced relief for chronic dry eye, especially important in Hawaii's climate.",
    description:
      "Hawaii's sun, wind, and salt air can make dry eye worse. Dr. Fernandez identifies the underlying cause, whether it's tear quality, meibomian gland dysfunction, or environment, and builds a treatment plan that brings lasting comfort rather than temporary relief.",
    details: [
      'Tear-film analysis',
      'Meibomian gland evaluation',
      'Prescription treatments',
      'Lifestyle recommendations',
      'Ongoing management',
    ],
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80',
    seoTitle: 'Dry Eye Treatment in Hilo, HI | Eye Q Hawaii',
    seoDescription:
      'Lasting dry eye relief in Hilo, Hawaii. Tear-film analysis and personalized dry eye treatment from Dr. Caron Fernandez, O.D. at Eye Q Hawaii.',
    faqs: [
      {
        q: 'Why are my eyes so dry in Hawaii?',
        a: "Sun, trade winds, salt air, and air conditioning all increase tear evaporation. Treating the underlying cause, not just adding drops, gives the most lasting relief.",
      },
      {
        q: 'Are over-the-counter eye drops enough for dry eye?',
        a: 'For mild cases they can help, but chronic dry eye often needs targeted treatment based on a tear-film and gland evaluation. We tailor a plan to your specific cause.',
      },
    ],
  },
  {
    slug: 'emergency-eye-care',
    title: 'Emergency Eye Care',
    shortTitle: 'Emergency Care',
    icon: 'lucide:siren',
    duration: 'Same-day when possible',
    forWho: 'Sudden injury, pain, or vision change',
    summary:
      'Urgent attention for eye injuries, infections, and sudden vision changes.',
    description:
      'A foreign object, a red and painful eye, sudden flashes or floaters, or an abrupt change in vision should never wait. Eye Q Hawaii provides prompt, in-office emergency eye care so you get expert evaluation and treatment fast, and a referral when a higher level of care is needed.',
    details: [
      'Foreign-body & abrasion care',
      'Eye infections (pink eye, styes)',
      'Sudden flashes / floaters evaluation',
      'Eye injury assessment',
      'Urgent referrals when needed',
    ],
    image:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
    seoTitle: 'Emergency Eye Care in Hilo, HI | Eye Q Hawaii',
    seoDescription:
      'Urgent eye care in Hilo, Hawaii, eye injuries, infections, flashes, floaters, and sudden vision changes. Call Eye Q Hawaii for same-day help.',
    faqs: [
      {
        q: 'What counts as an eye emergency?',
        a: 'Sudden vision loss, eye pain, a chemical splash, an object in the eye, new flashes or a shower of floaters, or an eye injury are all reasons to be seen urgently. Call us right away.',
      },
      {
        q: 'Should I go to the ER or an optometrist for an eye problem?',
        a: 'For most eye injuries, infections, and sudden vision changes, an optometrist is equipped to diagnose and treat you quickly. For severe trauma or chemical burns, seek emergency medical care immediately.',
      },
    ],
  },
  {
    slug: 'lasik-surgery-referrals',
    title: 'LASIK & Surgery Referrals',
    shortTitle: 'LASIK & Surgery',
    icon: 'lucide:stethoscope',
    duration: 'Consultation',
    forWho: 'Considering vision-correction surgery',
    summary:
      'Trusted guidance and co-management for LASIK and other eye surgery.',
    description:
      "Thinking about LASIK or facing cataract or other eye surgery? Dr. Fernandez evaluates whether you're a good candidate, answers your questions honestly, refers you to a trusted surgeon, and manages your pre-operative and post-operative care close to home in Hilo.",
    details: [
      'LASIK candidacy evaluation',
      'Trusted surgeon referrals',
      'Pre-operative assessment',
      'Post-operative co-management',
      'Honest, no-pressure guidance',
    ],
    image:
      'https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1200&q=80',
    seoTitle: 'LASIK Consultations & Surgery Referrals in Hilo | Eye Q Hawaii',
    seoDescription:
      'LASIK candidacy evaluations and eye surgery referrals with pre- and post-operative co-management in Hilo, Hawaii, from Dr. Caron Fernandez, O.D.',
    faqs: [
      {
        q: 'Am I a good candidate for LASIK?',
        a: 'Candidacy depends on your prescription, corneal thickness, eye health, and age. A consultation determines whether LASIK or another procedure is right for you, with no pressure either way.',
      },
      {
        q: 'Do you perform LASIK in the office?',
        a: 'LASIK is performed by a surgeon at a surgical center. We handle your evaluation, refer you to a trusted surgeon, and provide convenient pre- and post-operative care in Hilo.',
      },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
