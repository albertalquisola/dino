import React from 'react';

import Copyright from 'components/reusable/CopyrightFooter';
import Headerbar from 'containers/Headerbar';

class TermsOfService extends React.Component {
  render() {
    const headerbar = <Headerbar />;
    const copyright = <Copyright />;

    return (
      <div className="terms-of-service">
        {headerbar}
        <div className="container">
          <h1>Beta Terms of Service</h1>
          <p>These Beta Terms of Service (the “Beta Terms”) are an agreement between you (the “Evaluator”, or “you”) and The Engineer & The Designer Labs, Inc., a Delaware corporation (“Company”) governing your access and use of a beta version of the internet based applications and services offered by the Company at and through the websites whatisprojectstag.com, projectstag.io and t23r.com (such services, applications and the website are collectively referred to as the “Beta Service”).  Your access and use of the Beta Service is subject to these Beta Terms and the Privacy Policy posted at whatisprojectstag.com/privacy-policy, which is incorporated in its entirety into these Beta Terms.  These Beta Terms shall remain in effect as long as Evaluator has access to the Beta Service.</p>
          <ol>
            <li><b>Evaluation.</b>  Company will provide Evaluator access to the Beta Service subject to these Beta Terms solely for internal evaluation purposes.  As a part of such evaluation and in order to access and use the Beta Service, Evaluator shall be required to submit to and store on the Beta Service certain electronic data, text, messages, communications and other materials or information about you, your employer, your customers and other business data (the “Customer Data”).</li>
            <li><b>Ownership.</b>
              <ul>
                <li>2.1 Evaluator shall own and retain all right, title and interest in and to the Customer Data.  Evaluator hereby grants Company a non-exclusive, worldwide, fully paid up license to use the Customer Data in order to provide the Beta Service to Evaluator and as described in the Privacy Policy.</li>
                <li>2.2  The Beta Service and all related intellectual property rights (whether or not registered) related thereto shall remain the exclusive property of Company.  Without limiting the foregoing, Company shall own and retain all right, title, and interest in and to any data derived by Company from its development, operation and/or provision of the Beta Service.  Under no circumstances shall Evaluator (i) share login information for the Beta Service with any third party, (ii) modify or reverse engineer the Beta Service or (iii) sell, license, distribute, or otherwise transfer to a third party or encumber the Beta Service without Company’s prior written consent. In exchange for access to the Beta Service, Evaluator hereby does and shall assign to Company any invention, work of authorship, idea, information, feedback or know-how (whether or not patentable) that is conceived, learned or reduced to practice in the course of this evaluation, including but not limited to any improvements to the Beta Service suggested by Evaluator, and any and all intellectual property rights of any sort with respect thereto. Evaluator agrees to take any action reasonably requested by Company to evidence, perfect, obtain, maintain, enforce or defend the foregoing.</li>
              </ul>
            </li>
            <li><b>No Warranty.</b> THE DEMO SERVICE IS PROVIDED “AS IS”, AND COMPANY MAKES NO WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT THERETO, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.</li>
            <li><b>Confidential Information.</b> Evaluator will not disclose to any third party the results of the evaluation of the Beta Service or other performance or functional evaluation of the Beta Service without prior written approval of Company.  Company shall have the right to use for any purpose any Evaluator feedback, comments and suggestions regarding the Beta Service. Except as provided herein, no rights are granted by Evaluator to any technology or intellectual property rights of Evaluator.</li>
            <li><b>Limitation of Liability.</b> Neither party shall be liable to the other party for any direct, indirect, incidental, special consequential or exemplary damages, however caused and under any theory of liability.  Without limiting the foregoing, Evaluator acknowledges and agrees that Company does not warrant results of use of the DEMO SERVICES, and Evaluator assumes all risk and responsibility with respect thereto.  Except with respect to breaches of confidentiality, the total liability of either party arising out of or related to this agreement shall not exceed $100.</li>
            <li><b>Relationship to Customer Agreement.</b> These Beta Terms constitute the entire agreement to date between Company and Evaluator with respect to the subject matter hereof and cannot be modified without the prior written consent of both parties.  If the Company and Evaluator subsequently enter into an agreement governing access to a non-demo version of the Company’s internet based services (including by posting terms of service online at whatisprojectstag.com, projectstag.io, or t23r.com), then these Beta Terms shall automatically terminate requiring no action on the part of Evaluator and the Company and shall automatically be superseded by such agreement.</li>
          </ol>
          </div>
        <div className="copyright-container">
          {copyright}
        </div>
      </div>
    );
  }
}

module.exports = TermsOfService;
