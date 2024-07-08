export const CONSTANTES = {
    TYPEACTION: {
        NEW:'new',
        EDIT:'edit'
    },
    MENUGROUP: {
        GROUP:'1',
        COLLAPSABLE:'2',
        BASIC:'3'
    },
    TYPE:{
        SUPPRIMER:'supprimer',
        SUSPENDRE:'SUSPENDRE',
        LEVER_SUSPENSION:'LEVER_SUSPENSION',
        MODIFIER:'modifier',
        ACTIVER:'activeDesactiv',
        DEBLOQUER:'debloquer',
        DETAIL:'detail',
        REPORT:'report',
        DETAILDEPOT:'detailDepot',
        DETAILAGENCE:'detailAgence',
        DETAILCAISSE:'detailCaisse',
        AFFECTATIONCAISSE:'affectationCaisse',
        DETAILVIREMENT:'detail-virement',
        VALIDERRETRO:'valider-retro',
        ANNULERRETRO:'annuler-retro',
        DETAILHISTORIQUE:'detail-historique',
        DETAILSCHEMACOMPTABLE:'detailSchemaComptable',
        DUPLICATE:'duplicate',
        BLOQUER:'bloquer',
        VALIDER:'valider',
        VALIDATE:'validate',
        ANNULER:'annuler',
        ANNULERTRANSACTION:'annuler_transaction',
        EXTOURNER:'extourner',
        AJOUTER:'Ajouter',
        MODIFIE:'Modifier',
        DETAIL_CREDIT:'detail-credit',
        DETAIL_DEMANDE_CREDIT:'detail-demande-credit',
        DETAIL_COMPTE:'detail-compte',
        DETAIL_BANQUE:'detailBanque',
        OUVERTURE:'ouverture',
        FERMETURE:'fermeture',
        VALIDER_DEMANDE:'validation-credit',
        VALIDER_COMMITE:'validation-commite',
        VALIDER_PERMANENT:'valider-virement-permanent',
        REJETER_DEMANDE:'rejeter-demande',
        REJETER_VIREMENT_PERMANENT:'rejeter-virement-permanent',
        DETAIL_TEMP:'detail-template',
    },
//start for api
    HTTP_STATUS : {
        SUCCESSFUL : 200,
        UNAUTHORIZED : 401,
        INVALIDATE : 503,
        OPTSENT : 300,
    },
    RESPONSE_DATA : 'data',
    RESPONSE_CODE : 'responseCode',
//end for api
    CURRENT_URL:{

    },
    CLIENT:{
        PARTICULIER:'particulier',
        ENTREPRISE:'entreprise',
        PP:'PP',
        PM:'PM',
    },
    URL:{
        CATEGORIE_CLIENT:'categorie-client'
    },
    STATUS:{
        SAISI:'SAISI',
        ACTIVE:'ACTIVE',
        DESACTIVE:'DESACTIVE',
        VALIDE:'VALIDE',
        ANNULE:'ANNULE',
        REJETE:'REJETE',
        FINANCE:'FINANCE',
        ENSOUFFRANCE:'EN_SOUFFRANCE',
        IMMOBILISE:'IMMOBILISE',
        CONTENTIEUX:'CONTENTIEUX',
        ACCEPTE:'ACCEPTE',
        VALIDE_PAR_LE_COMMITE:'VALIDE_PAR_LE_COMMITE',
        OUVERT:'OUVERT',
        FERME:'FERME',
        BLOQUE:'BLOQUE',
        CLOTURE:'CLOTURE',
        INACTIF:'INACTIF',
        DORMANT:'DORMANT',
        COMPLETED:'COMPLETED',
        UNKNOWN:'UNKNOWN',
        EXECUTING:'EXECUTING',
        NOOP:'NOOP',
        FAILED:'FAILED',
        STOPPED:'STOPPED',
        NONE:'NONE',
        PAYE:'PAYE',
        NON_PAYE:'NON_PAYE',
        ABANDONNE:'ABANDONNE',
        OUI:'true',
        NON:'false',
    },
    TABLEAUAMORTISSEMENT:'tableauAmortissement',
// Categorie client
    CATEGORIE_CLIENT:{
        CLIENT:'CLIENT',
        GENERAL:'GENERAL',
        CATEGORIE_CLIENT:'CATEGORIE_CLIENT'
    },
    COMPTE_TYPE: {
           EPARGNE: 'EPARGNE',
           CREDIT: 'CREDIT',
           INTERNE: 'INTERNE'
    },
    AGENCE:{
        CODE_AGENCE: '000',
        LIBELLE_AGENCE: 'Agence Paramétrage',
        CODE_PARAMETRAGE: '02000',
        CODE_SECURITE: '01000',
        NAV_BASH: 'BASH'
    },
    BATCH_STATUS: {
        START: 'START',
        RESTART: 'RESTART',
        STOP: 'STOP',
        COMPLETED: 'COMPLETED'
    },
    COMPTE_STATUS:{
        OUVERT:'OUVERT',
        BLOQUE:'BLOQUE',
        INACTIF:'INACTIF',
        DORMANT:'DORMANT',
        CLOTURE:'CLOTURE'
    },
    // Sequence batch
    SEQUENCE_STATUS:{
        ACTIVE:'ACTIVE',
        DESACTIVE:'DESACTIVE'
    },
    CATEGORIE_COMPTE:{
        PREVOYANCE_CODE:'PREVOYANCE',
        EPARGNE_CODE:'EPARGNE',
    },
    INSTITUTION:{
        FERME:'FERME',
        OUVERT:'OUVERT'
    },
    TYPE_GARANTIE : {
        EPARGNE_NANTIE:'EPARGNE_NANTIE',
        NANTISSEMENT_VEHICULE:'NANTISSEMENT_VEHICULE',
        NANTISSEMENT_MATERIEL:'NANTISSEMENT_MATERIEL',
        HYPOTHEQUE:'HYPOTHEQUE',
        GAGE_BIJOU:'GAGE',
        CAUTION_SOLIDAIRE:'CAUTION_SOLIDAIRE'
    },
    DATA_TYPE:{
        STRING:'STRING',
        INTEGER:'INTEGER',
        BOOLEAN:'BOOLEAN',
        LISTE:'LISTE',
        BIGDECIMAL:'BIGDECIMAL',
        DATE:'DATE',
    },
};
