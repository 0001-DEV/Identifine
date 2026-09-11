import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Rainoil Assets
import rainoilRender10 from '../assets/RAINOIL_RENDER_POST_PROCESS_10.jpg';
import rainoilRender7 from '../assets/RAINOIL_RENDER_POST_PROCESS_7.jpg';
import rainoilCompiled1 from '../assets/RAINOIL_COMPILED_RENDER_1.jpg';
import rainoilRender8 from '../assets/RAINOIL_RENDER_POST_PROCESS_8.jpg';
import rainoilRender9 from '../assets/RAINOIL_RENDER_POST_PROCESS_9.jpg';
import rainoilRender11 from '../assets/RAINOIL_RENDER_POST_PROCESS_11.jpg';

// Seplat Assets
import seplatImg from '../assets/seplat.webp';
import seplat2Img from '../assets/seplat 2.webp';
import seplat3Img from '../assets/seplat 3.webp';
import seplatRender1 from '../assets/RENDER 1.jpg';
import seplatRender8 from '../assets/RENDER 8.jpg';
import seplatRender11 from '../assets/RENDER 11.jpg';

// ADNOC Assets
import adnocPost14 from '../assets/POST 14.jpg';
import adnocPost2 from '../assets/POST 2.jpg';
import adnocPost5 from '../assets/POST 5.jpg';
import adnocPost8 from '../assets/POST 8.jpg';
import adnocPost9 from '../assets/POST 9.jpg';
import adnocRender10 from '../assets/RENDER 10.jpg';
import adnocRender14 from '../assets/RENDER 14.jpg';
import adnocRender11 from '../assets/RENDER 11.jpg';

// Google Assets
import googleNotepad1 from '../assets/NOTEPAD 1.jpg';
import googleWithScanCode from '../assets/GOOGLE WITH SCAN CODE.jpg';
import googleNotepad2 from '../assets/NOTEPAD 2.jpg';
import googlePostProcess8 from '../assets/POST PROCESS 8.jpg';
import googlePostProcess5 from '../assets/POST PROCESS 5.jpg';
import googleNotepad6 from '../assets/NOTEPAD 6.jpg';
import googleNotepad3 from '../assets/NOTEPAD 3.jpg';

// Renaissance Assets
import renaissanceMain from '../assets/case-studies/renaissance_main.png';
import renRender11 from '../assets/case-studies/renaissance_render_11.jpg';
import renColorEdit from '../assets/case-studies/renaissance_color_edit.jpg';
import renRender34 from '../assets/case-studies/renaissance_render_34.jpg';
import renRender33 from '../assets/case-studies/renaissance_render_33.jpg';
import renRender9 from '../assets/case-studies/renaissance_render_9.jpg';
import renRender12 from '../assets/case-studies/renaissance_render_12.jpg';

// Guinness Assets
import guinnessRender6 from '../assets/RENDER 6.png';
import guinnessRender8Copy from '../assets/RENDER 8 copy.jpg';
import guinnessRender5 from '../assets/RENDER 5.jpg';
import guinnessRender14Png from '../assets/RENDER 14.png';
import guinnessRender19 from '../assets/RENDER 19.jpg';
import guinnessRender7 from '../assets/RENDER 7.jpg';
import guinnessRender3 from '../assets/RENDER 3.png';

// NOVA Assets
import novaMain from '../assets/Nova.jpg';
import novaVideo from '../assets/Novavideo.mp4';
import novaCard2 from '../assets/Card 2.jpg';
import novaCard5 from '../assets/Card 5.jpg';
import novaCard8 from '../assets/Card 8.jpg';
import novaNotepad103 from '../assets/Notepad 1 03.jpg';
import novaA from '../assets/Nova a.jpg';

// UBA Assets
import ubaMain from '../assets/case-studies/uba_main.jpg';
import uba1Alt from '../assets/case-studies/uba_1_alt.jpg';
import uba1 from '../assets/case-studies/uba_1.jpg';
import ubaStacked from '../assets/case-studies/uba_stacked.jpg';
import ubaRenders2 from '../assets/case-studies/uba_renders_2.png';
import ubaRenders3 from '../assets/case-studies/uba_renders_3.jpg';
import ubaPvc2 from '../assets/case-studies/uba_pvc_2.png';

// Optiva Assets
import optivaPng from '../assets/OPTIVA.png';
import optivaVideo from '../assets/Optivavideo.mp4';
import optiva14 from '../assets/14.jpg';
import optivaNote from '../assets/optivanote.jpg';
import optiva1Img from '../assets/OPTIVA1.webp';
import optiva2Img from '../assets/OPTIVA2.webp';
import optiva3Img from '../assets/OPTIVA3.webp';

// NOVA Text Layout
const novaWriteup = (
  <div className="space-y-6 font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
    <div className="space-y-1">
      <h2 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        NOVA BANK × IDENTIFINE
      </h2>
      <p className="font-semibold text-base text-[#111111] pt-1">
        When a Bank Evolves, Its Identity Has to Move With It.
      </p>
    </div>

    <div className="space-y-3">
      <p>There are moments when an organization outgrows the way it has been represented.</p>
      <p>Not because what existed before was wrong, but because the organization itself has changed.</p>
      <p>For NOVA, that moment came with its evolution from a merchant bank into a national commercial bank.</p>
      <p>And that evolution created a bigger question:</p>
      <p className="font-semibold italic text-[#111111]">
        How do you make a new chapter of a bank visible through the people who represent it every day?
      </p>
      <p>That was where Identifine came in.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        FROM MERCHANT BANK TO SOMETHING MORE
      </h3>
      <p>Established in 2017 as NOVA Merchant Bank, NOVA built its early reputation around corporate and investment banking.</p>
      <p>In 2024, the institution entered a new chapter, transitioning to a national commercial banking licence and becoming NOVA Bank.</p>
      <p>The move expanded its ambition beyond its established corporate market to serve retail customers and SMEs, while introducing a more technology-led approach to banking through its Phygital model, bringing physical and digital experiences together.</p>
      <p>This was more than a change in licence.</p>
      <p className="font-medium">
        It was a change in scale.<br />
        A change in audience.<br />
        A change in experience.<br />
        And ultimately, a change in identity.
      </p>
      <p>NOVA was becoming bigger than the institution it had been.</p>
      <p>Its identity touchpoints needed to reflect that.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE CHALLENGE
      </h3>
      <p className="font-semibold text-[#111111]">How do you make transformation tangible?</p>
      <p>A bank can announce its transformation.</p>
      <p>It can communicate a new proposition.</p>
      <p>It can launch new digital products, open new branches and speak to new audiences.</p>
      <p>But transformation becomes real when people can see, interact with and experience it.</p>
      <p>The staff ID was one of those moments.</p>
      <p>It would be worn every day by the people representing NOVA across branches, offices, meetings and customer interactions.</p>
      <p>So we looked beyond the conventional idea of an identification card.</p>
      <p>We asked what the credential should communicate before a single word was spoken.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE IDEA
      </h3>
      <p className="font-bold text-[#111111] uppercase tracking-wide">
        THE ID WAS NOT THE ASSIGNMENT. IDENTITY WAS.
      </p>
      <p>Our approach began with a simple belief:</p>
      <p>A corporate ID should do more than identify the person wearing it. It should represent the organization behind them.</p>
      <p>For NOVA, that meant creating a physical touchpoint that could bridge two sides of the institution.</p>
      <p>The credibility of its merchant-banking heritage.</p>
      <p>And the energy of its new commercial-banking future.</p>
      <div className="pl-3 border-l-2 border-[#111111] space-y-1 my-2 text-xs uppercase tracking-wider font-semibold">
        <p>Established, but not dated.</p>
        <p>Modern, but not disposable.</p>
        <p>Technological, but still human.</p>
        <p>Professional, without becoming predictable.</p>
      </div>
      <p>The design became an exercise in translating NOVA&apos;s evolution into something people could physically carry.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        DESIGNING THE NOVA EXPERIENCE
      </h3>
      <p>We treated the credential as part of a larger identity system rather than an isolated piece of plastic.</p>
      <p>Every element had a role.</p>
      <p>
        The visual hierarchy.<br />
        The treatment of the employee information.<br />
        The relationship between the NOVA brand and the individual.<br />
        The physical presence of the card.<br />
        The balance between institutional authority and contemporary design.
      </p>
      <p>Together, these details created something that felt less like an administrative credential and more like a physical expression of the NOVA brand.</p>
      <p>Because the people wearing the card weren&apos;t simply employees. They were one of the most visible expressions of the organization.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        FROM CARD TO TOUCHPOINT
      </h3>
      <p>This distinction matters.</p>
      <p>A conventional staff ID answers one question: <span className="italic font-semibold">&ldquo;Who is this person?&rdquo;</span></p>
      <p>An identity experience asks a bigger one: <span className="italic font-semibold">&ldquo;What does this person represent?&rdquo;</span></p>
      <p>That shift shaped our thinking throughout the project.</p>
      <p>The card had to function operationally, but it also had to contribute to how NOVA was perceived.</p>
      <p>
        In a meeting.<br />
        At a branch.<br />
        At a reception desk.<br />
        In front of a customer.<br />
        In every moment where the physical identity of an employee became part of the customer&apos;s perception of the bank.
      </p>
      <p>The credential became a small but important piece of the NOVA experience.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        IDENTITY THAT MOVES WITH THE ORGANIZATION
      </h3>
      <p>NOVA&apos;s transformation did not happen in isolation.</p>
      <p>It was happening across its people, products, branches, digital channels and customer experiences.</p>
      <p>That meant the identity could not simply look different. It had to belong to the direction the organization was moving in.</p>
      <p>This is where our approach moves beyond card production.</p>
      <p>At Identifine, we look at physical identity through the lens of the organization itself.</p>
      <p className="italic">
        Who are you becoming?<br />
        What should people experience?<br />
        Where does identity appear?<br />
        And how can those touchpoints work together to create a more consistent expression of the organization?
      </p>
      <p>For NOVA, the staff credential became one answer to those questions.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE OUTCOME
      </h3>
      <p>What emerged was more than a redesigned staff ID.</p>
      <p>It was a physical identity touchpoint designed around a significant moment in NOVA&apos;s evolution.</p>
      <p>A credential that could help communicate:</p>
      <p className="font-medium">
        Who NOVA is.<br />
        What NOVA has become.<br />
        And where NOVA is going.
      </p>
      <p>The project demonstrated something we believe strongly at Identifine:</p>
      <p className="font-semibold">When an organization changes, its identity should not be left behind.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE IDENTIFINE APPROACH
      </h3>
      <p>We don&apos;t start with the card. We start with the organization.</p>
      <p>We look at its ambition, its people, its customers and the moments where identity becomes visible.</p>
      <p>Then we translate that understanding into physical and digital touchpoints that make the organization easier to recognize, experience and remember.</p>
      <p>For NOVA, that meant taking a familiar object and giving it a more meaningful role within the organization&apos;s transformation.</p>
      <p className="font-semibold">
        From identification to representation.<br />
        From a card to a touchpoint.<br />
        From an object to an experience.
      </p>
    </div>

    {/* Metadata Summary Card */}
    <div className="p-4 rounded-xl bg-white/70 border border-[#E0DED7] space-y-2.5 text-xs">
      <div className="font-bold text-[#111111] uppercase tracking-wider">NOVA BANK × IDENTIFINE</div>
      <div><span className="font-bold text-[#111111]">Industry:</span> Banking & Financial Services</div>
      <div><span className="font-bold text-[#111111]">Context:</span> Evolution from Merchant Banking to National Commercial Banking</div>
      <div><span className="font-bold text-[#111111]">Challenge:</span> Create a stronger physical identity experience that reflected NOVA&apos;s evolving institution, broader customer proposition and technology-led direction.</div>
      <div><span className="font-bold text-[#111111]">Approach:</span> Organizational understanding → Identity thinking → Concept development → Physical identity → Experience touchpoint</div>
      <div><span className="font-bold text-[#111111]">Deliverable:</span> Staff identity credential</div>
      <div><span className="font-bold text-[#111111]">Outcome:</span> A physical identity experience designed to make NOVA&apos;s transformation visible through the people who represent the bank.</div>
    </div>

    <div className="space-y-1">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE CLOSING
      </h3>
      <p>NOVA was changing the way it delivered banking.</p>
      <p>We helped change the way that transformation was carried by its people.</p>
      <p className="font-semibold text-[#111111]">
        Because sometimes, the first sign that an organization has changed isn&apos;t what it says. It&apos;s what people see when someone walks through the door.
      </p>
    </div>
  </div>
);

// Optiva Text Layout
const optivaWriteup = (
  <div className="space-y-6 font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
    <div className="space-y-1">
      <h2 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        OPTIVA CAPITAL PARTNERS × IDENTIFINE
      </h2>
      <p className="font-semibold text-base text-[#111111] pt-1">
        Beyond Identification. Designing the Identity of Trust.
      </p>
    </div>

    <div className="space-y-3">
      <p>Some organizations sell products.</p>
      <p>Others manage things that are far more personal.</p>
      <p>For Optiva Capital Partners, the work sits at the intersection of wealth, mobility, opportunity and legacy.</p>
      <p>Its clients come with ambitions that often extend far beyond a single financial decision. They are thinking about protecting what they have built, creating new opportunities, securing the future of their families and accessing possibilities beyond borders.</p>
      <p>In that kind of business, trust is not something you add to the brand afterwards.</p>
      <p className="font-semibold">It has to be felt at every point of contact.</p>
      <p>That was the opportunity Identifine saw when Optiva came to us.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE CONTEXT
      </h3>
      <p className="font-semibold text-[#111111]">When what you represent matters as much as what you do.</p>
      <p>Optiva operates across wealth management, investment advisory, investment immigration, international real estate and insurance.</p>
      <p>It is also an organization with an international outlook, working across markets, relationships and client needs.</p>
      <p>That creates a very particular design challenge.</p>
      <p>When the relationship is built on trust, every detail contributes to perception.</p>
      <p>
        The person sitting across the table.<br />
        The environment they walk into.<br />
        The document placed in their hands.<br />
        The business card exchanged after a meeting.<br />
        Even the identification carried by the person representing the organization.
      </p>
      <p>These things may seem small on their own. But together, they create an impression of the organization.</p>
      <p>And in a trust-driven business, impressions matter.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE CHALLENGE
      </h3>
      <p>Optiva didn&apos;t just want a better-looking ID.</p>
      <p>They wanted something that felt more representative of who they were.</p>
      <p>The existing identification experience presented an opportunity to rethink how the organization showed up physically.</p>
      <p>But we believed the brief went beyond the card itself.</p>
      <p className="font-semibold text-[#111111]">The real question was:</p>
      <p className="italic">
        If an Optiva representative is the first person a client encounters, does everything they carry communicate the same confidence and sophistication as the organization they represent?
      </p>
      <p>That became the starting point.</p>
      <p>Rather than treating the ID as an isolated object, we began looking at it as one part of a much larger identity experience.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE SHIFT
      </h3>
      <p className="font-semibold text-[#111111]">From an ID card to an identity experience.</p>
      <p>An identification card traditionally has one primary job: <span className="italic">Tell people who you are.</span></p>
      <p>We wanted the Optiva identity to do more.</p>
      <p>It needed to identify the individual, represent the organization and contribute to the experience of the client.</p>
      <p>That meant thinking about the credential through four simple ideas:</p>
      <div className="space-y-1 pl-3 border-l-2 border-[#111111] text-xs font-medium">
        <p><strong className="text-[#111111]">Identity:</strong> Who is this person?</p>
        <p><strong className="text-[#111111]">Representation:</strong> What organization do they represent?</p>
        <p><strong className="text-[#111111]">Perception:</strong> What does their presence communicate?</p>
        <p><strong className="text-[#111111]">Experience:</strong> How does that encounter make the client feel?</p>
      </div>
      <p>Once we started looking at the problem this way, the design direction became much clearer.</p>
      <p className="font-semibold">We weren&apos;t designing a card. We were designing a physical expression of Optiva.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        DESIGNING FOR PRESENCE
      </h3>
      <p>For an organization dealing with wealth and high-value decisions, physical presence matters.</p>
      <p>This informed our approach to the materials and objects within the identity system.</p>
      <p>The use of metal introduced a different kind of physical experience.</p>
      <p>
        There is weight to it.<br />
        There is permanence.<br />
        There is a sense of intention when it sits in your hand.
      </p>
      <p>But we didn&apos;t use premium materials simply to make the objects feel expensive.</p>
      <p>The material had to support the story.</p>
      <p>Optiva operates in a world where its clients expect professionalism, confidence and attention to detail. The physical identity therefore needed to carry those same qualities.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        AN IDENTITY SYSTEM, NOT A COLLECTION OF OBJECTS
      </h3>
      <p>The project grew beyond the staff credential.</p>
      <p>We began looking at how Optiva could express the same identity across the objects and touchpoints that shape its client relationships.</p>
      <p>
        The identification card.<br />
        The metal business card.<br />
        Executive credentials.<br />
        Client-facing materials.<br />
        Presentation and portfolio touchpoints.
      </p>
      <p>Each object had its own purpose. But they needed to feel connected.</p>
      <p className="font-semibold">Different touchpoints. One identity.</p>
      <p>That consistency is important.</p>
      <p>Because a premium identity experience is rarely created by one beautiful object. It is created when the details feel like they belong together.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        WHERE IDENTITY MEETS EXPERIENCE
      </h3>
      <p>A client rarely experiences an organization through a single interaction. They experience it progressively.</p>
      <p>
        A person introduces themselves.<br />
        A card changes hands.<br />
        A document is presented.<br />
        A conversation begins.<br />
        A proposal follows.<br />
        A relationship develops.
      </p>
      <p>Every one of these moments leaves an impression.</p>
      <p>For Optiva, we saw an opportunity to make those moments feel more intentional.</p>
      <p>The identity became something that could move with the relationship, from the first introduction through to deeper client engagement.</p>
      <p>The goal was consistency without making the experience feel repetitive.</p>
      <p>Every touchpoint should feel unmistakably Optiva while still serving its own role.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE RESULT
      </h3>
      <p>What started with a simple request to rethink an ID became a broader exploration of how Optiva could represent itself physically.</p>
      <p>The result was an identity experience built around presence, consistency and trust.</p>
      <p>
        The ID identifies the individual.<br />
        The business card creates a stronger first impression.<br />
        The premium materials reinforce the positioning.<br />
        The supporting touchpoints extend the identity into the client relationship.
      </p>
      <p>Together, they create something greater than any individual object.</p>
      <p className="font-semibold">A more intentional way for Optiva to show up.</p>
    </div>

    <div className="space-y-2">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE IDENTIFINE APPROACH
      </h3>
      <p>This project reinforced something fundamental to how we work.</p>
      <p>We don&apos;t believe organizational identity begins with a logo. And it certainly doesn&apos;t end with a card.</p>
      <p>Identity lives in the things people see, touch, carry, use and experience.</p>
      <p>
        It lives in the employee representing the organization.<br />
        The credential around their neck.<br />
        The business card across the table.<br />
        The document handed to a client.<br />
        The physical environment.<br />
        The digital experience that follows.
      </p>
      <p>These are all parts of the same story. Our role is to help organizations make that story more intentional.</p>
    </div>

    {/* Metadata Summary Card */}
    <div className="p-4 rounded-xl bg-white/70 border border-[#E0DED7] space-y-2.5 text-xs">
      <div className="font-bold text-[#111111] uppercase tracking-wider">OPTIVA CAPITAL PARTNERS × IDENTIFINE</div>
      <div><span className="font-bold text-[#111111]">Industry:</span> Wealth Management & Investment</div>
      <div><span className="font-bold text-[#111111]">Challenge:</span> Create a more sophisticated physical identity experience that better reflected Optiva&apos;s positioning and the calibre of the clients it serves.</div>
      <div><span className="font-bold text-[#111111]">Approach:</span> Organizational understanding → Identity concept → Material exploration → Credential design → Client-facing touchpoints</div>
      <div><span className="font-bold text-[#111111]">Key Touchpoints:</span> Staff identification • Metal business cards • Executive identity • Client-facing materials</div>
      <div><span className="font-bold text-[#111111]">Outcome:</span> A more cohesive physical identity experience designed to reinforce Optiva&apos;s presence across the moments that matter.</div>
    </div>

    <div className="space-y-1">
      <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">
        THE CLOSING
      </h3>
      <p>Trust is built over time.</p>
      <p>But sometimes, it begins with something much smaller.</p>
      <p className="italic">
        A first introduction.<br />
        A card placed on a table.<br />
        A name.<br />
        A face.<br />
        A moment.
      </p>
      <p className="font-semibold text-[#111111]">For Optiva, we designed the identity that carries that moment.</p>
    </div>
  </div>
);

const caseStudyDetails = {
  'rainoil': {
    title: 'Rainoil',
    type: 'Visual Identity Direction, Touchpoints',
    year: '2026',
    writeup: 'We partnered with Rainoil to provide visual identity direction for their latest campaign. The campaign features a mix of innovative design elements and striking imagery.',
    images: [
      rainoilRender7,
      rainoilCompiled1,
      rainoilRender8,
      rainoilRender9,
      rainoilRender11
    ],
    nextSlug: 'seplat',
    nextTitle: 'Seplat'
  },
  'seplat': {
    title: 'Seplat',
    type: 'Visual Identity Direction, Touchpoints',
    year: '2026',
    writeup: (
      <div className="space-y-6 font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
        <p>
          One identity. Two systems. One seamless experience. Rethinking the employee credential as more than a card — but as a point where technology, access and organizational identity meet.
        </p>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE CHALLENGE</h3>
          <p>
            Two offices. Two systems. One organization. Seplat Energy had two office environments, each operating on a different access-control system. For employees moving between them, identity came with friction. What should have been a simple act of access required navigating two separate systems — and potentially, two separate credentials. But the problem went deeper. The employee ID was functioning as a utility — a tool to open doors — rather than an expression of the brand itself. In an organization operating at the highest levels of the energy sector, touchpoints should reflect precision, authority and cohesion. The access card was a missed opportunity.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE QUESTION</h3>
          <p>
            How do you unify two separate physical security systems into a single employee credential — without changing the underlying infrastructure of either office? And how do you turn that credential into something an employee is proud to carry?
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE INSIGHT</h3>
          <p>
            An identity card is not just hardware. It is the most frequent physical interaction an employee has with their organization. When designed thoughtfully, it ceases to be a plastic card and becomes an artifact of belonging.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE APPROACH</h3>
          <p>
            Identifine approached the challenge not as a card-printing exercise, but as an identity architecture problem. We audited both access control systems to understand their frequencies, protocols and encoding requirements. The solution required embedding dual-chip technology into a single, high-durability substrate — allowing one card to communicate seamlessly across both office environments. But technical integration was only half the assignment. The card itself needed to feel like Seplat Energy: modern, disciplined and premium. We designed a clean, minimalist visual layout that elevated the company’s brand identity, utilizing precision surface finishing and durable materials built for daily, high-use environments.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE SOLUTION</h3>
          <p>
            A single, custom-engineered dual-technology smart card that grants frictionless access across all Seplat Energy locations. Paired with a refined visual identity that replaces generic corporate pass design with a sleek, high-grade executive credential.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">FROM ACCESS CARD TO IDENTITY EXPERIENCE</h3>
          <p>
            To complete the ecosystem, Identifine delivered the cards in custom-designed executive packaging — transforming what is normally a administrative handoff into an onboarding moment that communicates value from day one.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE RESULT</h3>
          <p>
            Zero friction across offices. One card for every employee. A tangible upgrade to Seplat Energy’s everyday touchpoints.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE BIGGER IDEA</h3>
          <p>
            Technology should solve complexity silently. Design should make the solution feel effortless.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">CLOSING</h3>
          <p>
            Identifine exists at the intersection of both — turning everyday corporate objects into expressions of identity, access and precision.
          </p>
        </div>
      </div>
    ),
    images: [
      seplatImg,
      seplat3Img,
      seplat2Img,
      seplatRender1,
      seplatRender8,
      seplatRender11
    ],
    nextSlug: 'adnoc',
    nextTitle: 'ADNOC'
  },
  'adnoc': {
    title: 'ADNOC',
    type: 'Corporate Identity Architecture, Strategic Touchpoints',
    year: '2026',
    writeup: 'We partnered with ADNOC to engineer high-precision executive passes and corporate identity touchpoints reflecting international energy leadership.',
    images: [
      adnocPost2,
      adnocPost5,
      adnocPost8,
      adnocPost9,
      adnocPost14,
      adnocRender10,
      adnocRender14
    ],
    nextSlug: 'google',
    nextTitle: 'Google'
  },
  // Legacy alias for revolution-plus
  'revolution-plus': {
    title: 'ADNOC',
    type: 'Corporate Identity Architecture, Strategic Touchpoints',
    year: '2026',
    writeup: 'We partnered with ADNOC to engineer high-precision executive passes and corporate identity touchpoints reflecting international energy leadership.',
    images: [
      adnocPost2,
      adnocPost5,
      adnocPost8,
      adnocPost9,
      adnocPost14,
      adnocRender10,
      adnocRender14
    ],
    nextSlug: 'google',
    nextTitle: 'Google'
  },
  'google': {
    title: 'Google',
    type: 'Enterprise Technology & Connected Touchpoints',
    year: '2026',
    writeup: 'We collaborated with Google on smart executive physical touchpoints and interactive credentials integrating modern NFC scan architecture with clean industrial aesthetics.',
    images: [
      googleWithScanCode,
      googleNotepad2,
      googlePostProcess8,
      googlePostProcess5,
      googleNotepad6,
      googleNotepad3
    ],
    nextSlug: 'renaissance',
    nextTitle: 'Renaissance'
  },
  // Legacy alias for arm
  'arm': {
    title: 'Google',
    type: 'Enterprise Technology & Connected Touchpoints',
    year: '2026',
    writeup: 'We collaborated with Google on smart executive physical touchpoints and interactive credentials integrating modern NFC scan architecture with clean industrial aesthetics.',
    images: [
      googleWithScanCode,
      googleNotepad2,
      googlePostProcess8,
      googlePostProcess5,
      googleNotepad6,
      googleNotepad3
    ],
    nextSlug: 'renaissance',
    nextTitle: 'Renaissance'
  },
  'renaissance': {
    title: 'Renaissance',
    type: 'Energy & Infrastructure Identity Touchpoints',
    year: '2026',
    writeup: 'We partnered with Renaissance to design and produce executive corporate credentials and premium identity touchpoints built for nationwide enterprise deployment.',
    images: [
      renRender11,
      renColorEdit,
      renRender34,
      renRender33,
      renRender9,
      renRender12
    ],
    nextSlug: 'guinness',
    nextTitle: 'Guinness'
  },
  // Legacy alias for sterling-bank
  'sterling-bank': {
    title: 'Renaissance',
    type: 'Energy & Infrastructure Identity Touchpoints',
    year: '2026',
    writeup: 'We partnered with Renaissance to design and produce executive corporate credentials and premium identity touchpoints built for nationwide enterprise deployment.',
    images: [
      renRender11,
      renColorEdit,
      renRender34,
      renRender33,
      renRender9,
      renRender12
    ],
    nextSlug: 'guinness',
    nextTitle: 'Guinness'
  },
  'guinness': {
    title: 'Guinness',
    type: 'Brand Heritage & Executive Pass Ecosystem',
    year: '2026',
    writeup: 'We partnered with Guinness to craft iconic brand identity credentials, dynamic executive passes, and tactile corporate presentation touchpoints.',
    images: [
      guinnessRender8Copy,
      guinnessRender5,
      guinnessRender14Png,
      guinnessRender19,
      guinnessRender7,
      guinnessRender3
    ],
    nextSlug: 'nova',
    nextTitle: 'NOVA'
  },
  // Legacy alias for tvc
  'tvc': {
    title: 'Guinness',
    type: 'Brand Heritage & Executive Pass Ecosystem',
    year: '2026',
    writeup: 'We partnered with Guinness to craft iconic brand identity credentials, dynamic executive passes, and tactile corporate presentation touchpoints.',
    images: [
      guinnessRender8Copy,
      guinnessRender5,
      guinnessRender14Png,
      guinnessRender19,
      guinnessRender7,
      guinnessRender3
    ],
    nextSlug: 'nova',
    nextTitle: 'NOVA'
  },
  'nova': {
    title: 'NOVA Bank',
    type: 'Commercial Banking Transition & Phygital Credentials',
    year: '2026',
    writeup: novaWriteup,
    images: [
      novaVideo,
      novaCard2,
      novaCard5,
      novaCard8,
      novaNotepad103,
      novaA
    ],
    nextSlug: 'uba',
    nextTitle: 'UBA'
  },
  // Legacy alias for bank-78
  'bank-78': {
    title: 'NOVA Bank',
    type: 'Commercial Banking Transition & Phygital Credentials',
    year: '2026',
    writeup: novaWriteup,
    images: [
      novaVideo,
      novaCard2,
      novaCard5,
      novaCard8,
      novaNotepad103,
      novaA
    ],
    nextSlug: 'uba',
    nextTitle: 'UBA'
  },
  'uba': {
    title: 'UBA',
    type: 'Pan-African Executive Credentials & Touchpoints',
    year: '2026',
    writeup: 'We partnered with United Bank for Africa (UBA) to deliver international bespoke leadership identity cards and executive touchpoints across 20 African subsidiary markets.',
    images: [
      uba1Alt,
      uba1,
      ubaStacked,
      ubaRenders2,
      ubaRenders3,
      ubaPvc2
    ],
    nextSlug: 'optiva',
    nextTitle: 'Optiva'
  },
  'optiva': {
    title: 'Optiva Capital Partners',
    type: 'Wealth Management & Trust Identity Ecosystem',
    year: '2026',
    writeup: optivaWriteup,
    images: [
      optivaVideo,
      optivaPng,
      optiva14,
      optivaNote,
      optiva1Img,
      optiva2Img,
      optiva3Img
    ],
    nextSlug: 'rainoil',
    nextTitle: 'Rainoil'
  }
};

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentSlug = id || 'rainoil';
  const study = caseStudyDetails[currentSlug] || caseStudyDetails['rainoil'];

  return (
    <div className="bg-[#EBEAE6] text-[#1f1f1f] min-h-screen pt-36 sm:pt-48 pb-28 px-6 sm:px-12 lg:px-16 selection:bg-[#E2B857] selection:text-black font-sans">
      <div className="max-w-[94rem] mx-auto">
        
        {/* Main 2-Column Content Layout (Left Column moved to left edge, Images to right) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: STICKY INFO PANEL (PROJECT TITLE, TYPE, YEAR, WRITEUP)       */}
          {/* ========================================================================= */}
          <div className="animate-hero-fade-1 w-full lg:w-[380px] shrink-0 lg:sticky lg:top-36 space-y-8 text-left max-h-[calc(100vh-10rem)] overflow-y-auto thin-scrollbar pr-2">
            
            {/* Back link */}
            <NavLink
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#737378] hover:text-[#1f1f1f] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Case Studies</span>
            </NavLink>

            {/* Title, Project Type & Year */}
            <div className="space-y-6">
              
              {/* Project Title */}
              <h1 className="font-galano font-semibold text-sm sm:text-base text-[#1f1f1f] tracking-tight">
                {study.title}
              </h1>

              {/* Project Type & Year (Gray Color) */}
              <div className="space-y-0.5 text-sm font-medium text-[#737378]">
                <p>{study.type}</p>
                <p>{study.year}</p>
              </div>

              {/* Project Writeup */}
              {typeof study.writeup === 'string' ? (
                <p className="font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
                  {study.writeup}
                </p>
              ) : (
                study.writeup
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: VISUALS & IMAGERY (MOVED MORE TO THE RIGHT)                 */}
          {/* ========================================================================= */}
          <div className="animate-hero-fade-2 flex-1 w-full max-w-4xl space-y-4">
            
            {study.images.map((imgSrc, index) => {
              const isVideo = typeof imgSrc === 'string' && (imgSrc.endsWith('.mp4') || imgSrc.includes('.mp4'));

              return (
                <div
                  key={index}
                  className="w-full rounded-none overflow-hidden bg-[#FBFBFA] border border-[#E5E5E5] shadow-sm"
                >
                  {isVideo ? (
                    <video
                      src={imgSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover select-none rounded-none"
                    />
                  ) : (
                    <img
                      src={imgSrc}
                      alt={`${study.title} visual ${index + 1}`}
                      className="w-full h-auto object-cover select-none rounded-none"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchpriority={index === 0 ? 'high' : 'auto'}
                      decoding={index === 0 ? 'sync' : 'async'}
                    />
                  )}
                </div>
              );
            })}

            {/* Previous / Next Project Navigation Bar */}
            <div className="flex items-center justify-between pt-10 pb-4 border-t border-[#E5E5E5] text-sm">
              <div className="flex-1" />
              {study.nextSlug && (
                <NavLink
                  to={`/case-studies/${study.nextSlug}`}
                  className="font-galano font-semibold text-[#1f1f1f] hover:text-[#737378] transition-colors inline-flex items-center gap-1 text-sm select-none"
                >
                  <span>↳ {study.nextTitle}</span>
                </NavLink>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
