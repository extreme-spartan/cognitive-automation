/**
 *
 * IBM Confidential
 *
 * (C) Copyright IBM Corp. 2019, 2023
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U. S. Copyright Office
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 **/

'use strict';

(function () {

  window.__webpack_public_path__ = '/';

  var conversation = window.conversation = {};

  conversation.config = {
    endpoints : {
      authenticate : '/rest/authenticate',
      apiURL : "https://api.us-east.assistant.watson.cloud.ibm.com",
      bluemix : '/rest/bluemix',
      content : '/rest/content',
      store : '/rest',
      feedback : '/rest/feedback',
      experiments : '/rest/experiments',
      logout : "https://iam.cloud.ibm.com/identity/logout",
      webChat : "https://web-chat.global.assistant.watson.appdomain.cloud",
      preview : "https://web-chat.global.assistant.watson.appdomain.cloud"
    },
    regions : {"us-east":{"console":"https://cloud.ibm.com","api":"https://api.us-east.cf.cloud.ibm.com","bss":"https://accountmanagement.us-east.cf.cloud.ibm.com"}},
    features : {"access-control":true,"actions-client-actions":false,"actions-digress-to-dialog":false,"actions-new-ia-launch-modes":true,"actions-new-ia-launch-modes-no-action-matches":true,"analytics-unrecognized":true,"autolearn-analytics":true,"actions-autolearn-new-ia":true,"beta":false,"channel-transfer":true,"cristal-support":true,"enable-premium-features":false,"enhanced-on-topic-classifier-default":true,"hotjar-tracking":false,"ia-new-ia-enabled":true,"icp":false,"aws":false,"integrations":true,"integrations-debug-experience-enabled":true,"intent-conflicts":true,"intercom-integration":true,"llm-let-assistant-decide":false,"off-topic-v2":true,"open-entities":true,"channels-phone-enabled":false,"search":true,"content-enable-search-skill":true,"discovery-llm-conversational-search":false,"search-skill-highlight-answers":true,"skill-versions":true,"spell-check":true,"spell-check-default":true,"synonym-recommendations":true,"twilio-text-integration":true,"web-experience":true,"web-experience-salesforce":true,"web-experience-zendeskweb":true,"webhook-connectors":true,"whatsapp-integration":true},
    languages : [{"label":"ARABIC","value":"ar","search":false,"enhanced-on-topic-classifier-default":true},{"label":"GERMAN","value":"de","enhanced-on-topic-classifier-default":true,"search":true},{"label":"ENGLISH_US","value":"en","autolearn-analytics":true,"enhanced-on-topic-classifier-default":true,"off-topic-v2":false,"open-entities":true,"search":true,"spell-check":true,"spell-check-default":true,"synonym-recommendations":true},{"label":"SPANISH","value":"es","enhanced-on-topic-classifier-default":true,"off-topic-v2":false,"search":true,"synonym-recommendations":true},{"label":"FRENCH","value":"fr","enhanced-on-topic-classifier-default":true,"off-topic-v2":false,"open-entities":true,"search":true,"spell-check":true,"spell-check-default":false,"synonym-recommendations":true},{"label":"ITALIAN","value":"it","enhanced-on-topic-classifier-default":true,"off-topic-v2":false,"search":true},{"label":"JAPANESE","value":"ja","search":true,"synonym-recommendations":true,"enhanced-on-topic-classifier-default":true},{"label":"KOREAN","value":"ko","search":true,"enhanced-on-topic-classifier-default":true},{"label":"BRAZILIAN_PORTUGUESE","value":"pt-br","enhanced-on-topic-classifier-default":true,"search":true},{"label":"CZECH","value":"cs","search":true,"enhanced-on-topic-classifier-default":true},{"label":"DUTCH","value":"nl","search":true,"enhanced-on-topic-classifier-default":true},{"label":"CHINESE_TRADITIONAL","value":"zh-tw","search":true,"enhanced-on-topic-classifier-default":true},{"label":"CHINESE_SIMPLIFIED","value":"zh-cn","enhanced-on-topic-classifier-default":true,"search":true},{"label":"LANGUAGE_AGNOSTIC","value":"xx","off-topic-v2":false,"open-entities":false,"search":true}],
    segment : {"key":"XroYJWPOY9jAMsZSceoCmc6bWLd6Z7iD","src":"https://cloud.ibm.com/analytics/build/bluemix-analytics.min.js"},
    deployEnv : "wdcprd",
    integrations : {"intercom":{"client_id":"fe417d6a-c124-4f3e-912f-8676c15e0e92","oauth_redirect_url":"https://us-east.assistant.watson.cloud.ibm.com"}},
    buildInfo : {"name":"wea-conversational-ui","description":"IBM Watson Conversation Tooling","version":"2.69.1","nodeEnv":"production","imageTag":"ui:20230919-225305-215b97e8c","buildTime":"225305","buildDate":"20230919","gitCommit":"215b97e8c"},
    webExperience : {"versionHostname":"https://web-chat.assistant.watson.cloud.ibm.com","hostname":"https://web-chat.global.assistant.watson.appdomain.cloud"},
    webSupport : {"integrationID":"2d536ae8-8b38-46a9-b390-2c6f847e8a97","region":"us-south","serviceInstanceID":"f1859287-fb9d-4717-9811-73cb58ad63be"},
    launchDarkly : {
      enabled: true,
      // Note that the following is a client key, which is meant to be public/insecure.
      // It is meant to be made available in client environments, and it can not be
      // used to retrieve any private or sensitive data or make any changes.
      clientKey: '5fa53d570e076a0964eae3bb'
    },
    plusTrialLength : 30,
    experiments : {},
    activityMonitor: {
      enabled: false,
      interval: 120000
    },
    baseUrl : ''
  };

})();
