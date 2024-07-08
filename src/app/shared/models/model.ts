// cette fonction permet d'ajouter de modifier de supprimer et de lister ces composants

import { environment } from "src/environments/environment";

export const models = {
    'admin/parametrages': {
        title: 'Paramétrage partenaire',
        titre: 'Ajout paramétrage',
        titleFile: 'Liste des Pparamétrages',
        sousTitle: 'un paramétrage',
        url: 'parametrages',
        reponse: 'paramétrage',
        typeEntity: 'ce paramétrage',
        entete: 'un paramétrage',
        addButton: true,
        code: '01450',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Partenaire', 'Adresse', 'Téléphone', 'Nom Prénom', 'Date Création'],
        tabFileHead: ['Partenaire', 'Adresse', 'Téléphone', 'Nom Prénom', 'Date Création'],
        fields: [{
            fxFlex: '50',
            label: 'Partenaire',
            name: 'partenaire',
            type: 'text',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
        },
            {
                fxFlex: '50',
                label: 'Adresse',
                name: 'adresse',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Téléphone',
                name: 'telephone',
                type: 'tel', isRequired: false, validations: []
            },
            {
                fxFlex: '50',
                label: 'Logo',
                name: 'logo',
                type: 'file',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Couleur',
                name: 'couleur',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nom Prénom',
                name: 'nomPrenom',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Région',
                name: 'region',
                type: 'select-by-dependance',
                displayName: 'region',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'region',
                dependanceUrl: 'departement',
                dependanceName: 'departement',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
            , {
                fxFlex: '50',
                label: 'Departement',
                name: 'departement',
                type: 'select',
                displayName: 'departement',
                value: '',
                isRequired: true,
                list: [],
                url: 'departement',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
            , {
                fxFlex: '50',
                label: 'Situation matrimoniale',
                name: 'situationMatrimoniale',
                type: 'select-by-linkField',
                displayName: 'name',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [{name: 'Marié(e)', id: 'M'}, {name: 'celibataire', id: 'C'}],
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
            , {
                fxFlex: '50',
                label: 'Nombre d\'enfant',
                name: 'nombreEnfant',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: true,
                chieldOther: {name: 'situationMatrimoniale', value: 'M'},
                list: [{name: 1, value: 1}, {name: 2, value: 2}, {name: 3, value: 3}, {name: 4, value: 4}],
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Stepper',
                name: 'stepper',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: true,
                list: [{name: 'oui', value: 1}, {name: 'non', value: 0}],
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                chieldOther: {name: 'stepper', value: 1},
                steppers: [{
                    title: 'Informations client',
                    controlForm: 'firstGroup',
                    fields: [
                        {
                            fxFlex: 50,
                            label: 'Client',
                            name: 'client',
                            type: 'text',
                            displayName: 'intitule',
                            value: '',
                            isRequired: true,
                            list: [],
                            dependancy: false,
                            url: 'client',
                            validations: [{
                                name: 'required',
                                value: 'Validators.required',
                                message: 'Ce champ est obligatoire'
                            }]
                        },
                        {
                            fxFlex: 50,
                            label: 'Contact',
                            name: 'contact',
                            type: 'text',
                            displayName: 'name',
                            displayValue: 'id',
                            value: '',
                            isRequired: true,
                            list: [],
                            url: '',
                            validations: [{
                                name: 'required',
                                value: 'Validators.required',
                                message: 'Ce champ est obligatoire'
                            }]
                        },
                        {
                            fxFlex: 50,
                            label: 'Situation',
                            name: 'situationMat',
                            type: 'select2',
                            displayName: 'name',
                            displayValue: 'value',
                            value: '',
                            isRequired: true,
                            list: [{name: 'marié(e)', value: '1'}, {name: 'célibataire', value: '2'}],
                            url: '',
                            validations: [{
                                name: 'required',
                                value: 'Validators.required',
                                message: 'Ce champ est obligatoire'
                            }]
                        }
                    ],
                    linkedList: {name: 'contact', url: 'contact/', indexStep: 0, indexField: 1},

                },
                    {
                        title: 'Informations Entreprise',
                        controlForm: 'secondGroup',
                        fields: [
                            {
                                fxFlex: 50,
                                label: 'Entreprise',
                                name: 'entreprise',
                                type: 'text',
                                displayName: 'intitule',
                                value: '',
                                isRequired: true,
                                list: [],
                                dependancy: false,
                                url: 'client',
                                validations: [{
                                    name: 'required',
                                    value: 'Validators.required',
                                    message: 'Ce champ est obligatoire'
                                }]
                            },
                            {
                                fxFlex: 50,
                                label: 'Contact',
                                name: 'contact',
                                type: 'text',
                                displayName: 'name',
                                displayValue: 'id',
                                value: '',
                                isRequired: true,
                                list: [],
                                url: '',
                                validations: [{
                                    name: 'required',
                                    value: 'Validators.required',
                                    message: 'Ce champ est obligatoire'
                                }]
                            },
                            {
                                fxFlex: 50,
                                label: 'Categorie',
                                name: 'categorie',
                                type: 'select2',
                                displayName: 'name',
                                displayValue: 'value',
                                value: '',
                                isRequired: true,
                                list: [{name: 'SA', value: 'sa'}, {name: 'SARL', value: 'sarl'}],
                                url: '',
                                validations: [{
                                    name: 'required',
                                    value: 'Validators.required',
                                    message: 'Ce champ est obligatoire'
                                }]
                            },
                            {
                                fxFlex: 50,
                                label: 'fonction',
                                name: 'fonction',
                                type: 'text',
                                displayName: 'name',
                                displayValue: 'id',
                                value: '',
                                isRequired: true,
                                list: [],
                                url: '',
                                validations: [{
                                    name: 'required',
                                    value: 'Validators.required',
                                    message: 'Ce champ est obligatoire'
                                }]
                            }
                        ]
                    }
                ]
            }
        ],
        searchFields: [{name: 'Partenaire', field: 'partenaire', type: 'text', value: ''}, {
            name: 'Adresse',
            field: 'adresse',
            type: 'text',
            value: ''
        }, {name: 'Téléphone', field: 'telephone', type: 'tel', value: ''}, {
            name: 'Nom Prénom',
            field: 'nomPrenom',
            type: 'text',
            value: ''
        }],
        tabBody: ['partenaire', 'adresse', 'telephone', 'nomPrenom', 'createdAt'],
        tabFileBody: ['partenaire', 'adresse', 'telephone', 'nomPrenom', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/privileges-fr': {
        title: 'Paramétrage privilege',
        titre: 'Ajout privilege',
        titleFile: 'Liste des privilege',
        sousTitle: 'un privilege',
        url: 'privileges',
        reponse: 'privilege',
        typeEntity: 'ce privilege',
        entete: 'un privilege',
        addButton: true,
        code: '01451',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Niveau', 'Affichage Menu', 'Date Création'],
        tabFileHead: ['Code', 'Libelle', 'NIveau', 'Affichage Menu', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Niveau',
                name: 'niveau',
                type: 'select',
                isRequired: false,
                validations: [],
                displayName: 'name',
                displayValue: 'id',
                list: [{name: '1', id: '1'}, {name: '2', id: '2'}, {name: '3', id: '3'}, {name: '4', id: '4'}],
                dependanceUrl: '',
                dependanceName: 'rattache_a'
            },
            {
                fxFlex: '50',
                label: 'Rattaché à',
                name: 'rattache_a',
                value: '',
                type: 'select-by-dependance',
                isRequired: false,
                validations: [],
            },
            {
                fxFlex: '50',
                label: 'Affichage Menu',
                name: 'IsMenu',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'name',
                displayValue: 'id',
                list: [{name: 'Oui', id: 'Oui'}, {name: 'Non', id: 'Non'}]
            },
            {
                fxFlex: '50',
                label: 'Lien',
                name: 'lien',
                type: 'text',
                isRequired: true,
                validations: [],
                chieldOther: {name: 'IsMenu', value: 'Oui'}
            },
            {
                fxFlex: '50',
                label: 'Icone',
                name: 'icone',
                type: 'select',
                isRequired: true,
                validations: [],
                chieldOther: {name: 'IsMenu', value: 'Oui'},
                displayName: 'name',
                displayValue: 'value',
                list: [{name: 'directions_car', value: 'directions_car'}, {
                    name: 'airplanemode_active',
                    value: 'airplanemode_active'
                }, {name: 'list', value: 'list'},
                    {name: 'add_circle', value: 'add_circle'}, {name: 'check', value: 'check'}, {
                        name: 'person',
                        value: 'person'
                    }, {name: 'people', value: 'people'},
                    {name: 'local_hospital', value: 'local_hospital'}, {
                        name: 'email',
                        value: 'email'
                    }, {name: 'add_shopping_cart', value: 'add_shopping_cart'},
                    {name: 'cloud_upload', value: 'cloud_upload'}, {
                        name: 'engineering',
                        value: 'engineering'
                    }, {name: 'account_tree', value: 'account_tree'}, {name: 'settings', value: 'settings'},
                    {name: 'warehouse', value: 'warehouse'}]
            },
        ],
        searchFields: [
            {name: 'Code', field: 'code', type: 'text', value: ''},
            {name: 'Libelle', field: 'libelle', type: 'text', value: ''},
            {
                name: 'Niveau',
                field: 'niveau',
                type: 'select',
                value: '',
                displayName: 'name',
                displayValue: 'id',
                list: [{name: '1', id: '1'}, {name: '2', id: '2'}, {name: '3', id: '3'}, {name: '4', id: '4'}]
            },
            {
                name: 'Affichage Menu',
                field: 'isMenu',
                type: 'select',
                value: '',
                displayName: 'name',
                displayValue: 'id',
                list: [{name: 'Oui', id: 'oui'}, {name: 'Non', id: 'non'}]
            }],
        tabBody: ['code', 'libelle', 'niveau', 'isMenu', 'createdAt'],
        tabFileBody: ['code', 'libelle', 'niveau', 'IsMenu', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/privileges-en': {
        title: 'Paramétrage privilege',
        titre: 'Ajout privilege',
        titleFile: 'Liste des privilege',
        sousTitle: 'un privilege',
        url: 'privileges',
        reponse: 'privilege',
        typeEntity: 'ce privilege',
        entete: 'un privilege',
        addButton: true,
        code: '01451',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Niveau', 'Affichage Menu', 'Date Création'],
        tabFileHead: ['Code', 'Libelle', 'NIveau', 'Affichage Menu', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Niveau',
                name: 'niveau',
                type: 'select',
                isRequired: false,
                validations: [],
                displayName: 'name',
                displayValue: 'id',
                list: [{name: '1', id: '1'}, {name: '2', id: '2'}, {name: '3', id: '3'}, {name: '4', id: '4'}],
                dependanceUrl: '',
                dependanceName: 'rattache_a'
            },
            {
                fxFlex: '50',
                label: 'Rattaché à',
                name: 'rattache_a',
                value: '',
                type: 'select-by-dependance',
                isRequired: false,
                validations: [],
            },
            {
                fxFlex: '50',
                label: 'Affichage Menu',
                name: 'IsMenu',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'name',
                displayValue: 'id',
                list: [{name: 'Oui', id: 'Oui'}, {name: 'Non', id: 'Non'}]
            },
            {
                fxFlex: '50',
                label: 'Lien',
                name: 'lien',
                type: 'text',
                isRequired: true,
                validations: [],
                chieldOther: {name: 'IsMenu', value: 'Oui'}
            },
            {
                fxFlex: '50',
                label: 'Icone',
                name: 'icone',
                type: 'select',
                isRequired: true,
                validations: [],
                chieldOther: {name: 'IsMenu', value: 'Oui'},
                displayName: 'name',
                displayValue: 'value',
                list: [{name: 'directions_car', value: 'directions_car'}, {
                    name: 'airplanemode_active',
                    value: 'airplanemode_active'
                }, {name: 'list', value: 'list'},
                    {name: 'add_circle', value: 'add_circle'}, {name: 'check', value: 'check'}, {
                        name: 'person',
                        value: 'person'
                    }, {name: 'people', value: 'people'},
                    {name: 'local_hospital', value: 'local_hospital'}, {
                        name: 'email',
                        value: 'email'
                    }, {name: 'add_shopping_cart', value: 'add_shopping_cart'},
                    {name: 'cloud_upload', value: 'cloud_upload'}, {
                        name: 'engineering',
                        value: 'engineering'
                    }, {name: 'account_tree', value: 'account_tree'}, {name: 'settings', value: 'settings'},
                    {name: 'warehouse', value: 'warehouse'}]
            },
        ],
        searchFields: [
            {name: 'Code', field: 'code', type: 'text', value: ''},
            {name: 'Libelle', field: 'libelle', type: 'text', value: ''},
            {name: 'Niveau', field: 'niveau', type: 'text', value: ''},
            {name: 'Affichage Menu', field: 'isMenu', type: 'text', value: ''}],
        tabBody: ['code', 'libelle', 'niveau', 'isMenu', 'createdAt'],
        tabFileBody: ['code', 'libelle', 'niveau', 'IsMenu', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/pays-fr': {
        title: 'Gestion des pays',
        titre: 'Ajout un pays',
        titleFile: 'Liste des pays',
        sousTitle: 'un pays',
        url: 'pays',
        reponse: 'pays',
        typeEntity: 'ce pays',
        entete: 'un pays',
        addButton: true,
        code: '02610',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Libelle', 'Code Alpha 2', 'Code Alpha 3', 'Code Numérique', 'Nationalité'],
        tabFileHead: ['Libelle', 'Code Alpha2', 'Code Alpha 3', 'Code Numérique', 'Nationalité'],
        fields: [
            {
                fxFlex: '100',
                label: 'Nom',
                name: 'nom',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Alpha3',
                name: 'codeAlpha3',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Alpha2',
                name: 'codeAlpha2',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Numerique',
                name: 'codeNumerique',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nationalité',
                name: 'nationalite',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['nom', 'codeAlpha2', 'codeAlpha3', 'codeNumerique', 'nationalite'],
        tabFileBody: ['nom', 'codeAlpha2', 'codeAlpha3', 'codeNumerique', 'nationalite'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/mutuelle-fr': {
        title: 'Gestion des Institutions',
        titre: 'Ajout une Institution',
        titleFile: 'Liste des Institutions',
        sousTitle: 'une Institution',
        url: 'institution',
        reponse: 'Institution',
        typeEntity: 'cette Institution',
        entete: 'une Institution',
        addButton: true,
        code: '02110',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Devise', 'Numéro Téléphone', 'Pays', 'Date Création'],
        tabFileHead: ['Code', 'Libelle', 'Devise', 'Numéro Téléphone', 'Pays', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Téléphone',
                name: 'phoneCode',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Numéro Téléphone',
                name: 'phoneNumber',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Pays',
                name: 'pays',
                type: 'select',
                displayName: 'nom',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'pays',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Devise',
                name: 'codeAlphaDevise',
                type: 'select',
                displayName: 'codeAlphaDevise',
                displayValue: 'codeAlphaDevise',
                value: '',
                isRequired: true,
                list: [],
                url: 'devise',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Validation OTP',
                name: 'otpValidationRetrait',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            },
            {
                fxFlex: '50',
                label: 'Logo',
                name: 'logo',
                type: 'file',
                isRequired: false,
                validations: [],
                accept: ['.png', '.PNG', '.jpg', '.JPG']
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'deviseParDefaut', 'phoneNumber', 'pays', 'createdAt'],
        tabFileBody: ['code', 'libelle', 'deviseParDefaut', 'phoneNumber', 'pays', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/agence-fr': {
        title: 'Gestion des Agences',
        titre: 'Ajout une Agence',
        titleFile: 'Liste des Agences',
        sousTitle: 'une Agence',
        url: 'agence',
        reponse: 'agence',
        typeEntity: 'cette Agence',
        entete: 'une Agence',
        addButton: true,
        code: '02120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Code Téléphone', 'Numéro Téléphone', 'Région', 'Ville','Statut'],
        tabFileHead: ['Code', 'Libelle', 'Code Téléphone', 'Numéro Téléphone', 'Région', 'Ville','Statut'],
        fields: [
            {
                fxFlex: '50',
                label: 'Institution',
                name: 'institution',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'institution',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Téléphone',
                name: 'phoneCode',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Numéro Téléphone',
                name: 'phoneNumber',
                type: 'tel',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Région',
                name: 'region',
                type: 'selectReg',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'id',
                isRequired: true,
                list: [],
                url: 'region',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Ville',
                name: 'ville',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [
            // { name: "Code", field: "code", type: 'text', value: '' },
        ],
        tabBody: ['code', 'libelle', 'phoneCode', 'phoneNumber', 'region', 'ville','statut'],
        tabFileBody: ['code', 'libelle', 'phoneCode', 'phoneNumber', 'region', 'ville','statut'],
        action: [
            {name: 'modifier', icon: 'edit', color: 'primary'},
            {name: 'detailAgence', icon: 'eyes', color: 'green'},
            {name: 'ouverture', icon: 'unlock', color: 'primary'},
            {name: 'fermeture', icon: 'lock', color: 'primary'}
        ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/region-fr': {
        title: 'Gestion des régions',
        titre: 'Ajout une région',
        titleFile: 'Liste des régions',
        sousTitle: 'une région',
        url: 'region',
        reponse: 'région',
        typeEntity: 'cette région',
        entete: 'une région',
        addButton: true,
        code: '02620',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Date de creation'],
        tabFileHead: ['Code', 'Libelle', 'Date de creation'],
        fields: [
            {
                fxFlex: '100',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Pays',
                name: 'pays',
                type: 'select',
                displayName: 'nom',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'pays',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'dateCreated'],
        tabFileBody: ['code', 'libelle', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/agent-fr': {
        title: 'Gestion des agents',
        titre: 'Ajout un agent',
        titleFile: 'Liste des agents',
        sousTitle: 'un agent',
        url: 'agent',
        reponse: 'agent',
        typeEntity: 'cet agent',
        entete: 'un agent',
        addButton: true,
        code: '02160',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Prénom', 'Nom', 'Code Téléphone', 'Numéro Téléphone', 'Email', 'Agence'],
        tabFileHead: ['Numéro', 'Prénom', 'Nom', 'Code Téléphone', 'Numéro Téléphone', 'Email', 'Agence'],
        fields: [
            {
                fxFlex: '50',
                label: 'Numéro',
                name: 'numero',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Prénom',
                name: 'prenom',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nom',
                name: 'nom',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code Téléphone',
                name: 'phoneCode',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Numéro Téléphone',
                name: 'phoneNumber',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Email',
                name: 'email',
                type: 'email',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Agence',
                name: 'agence',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'agence',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['numero', 'prenom', 'nom', 'phoneCode', 'phoneNumber', 'email', 'agence'],
        tabFileBody: ['numero', 'prenom', 'nom', 'phoneCode', 'phoneNumber', 'email', 'agence'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/categorie-compte-fr': {
        title: 'Gestion des catégories de compte',
        titre: 'Ajout une catégorie de compte',
        titleFile: 'Liste des catégories de compte',
        sousTitle: 'une catégorie de compte',
        url: 'categorie-compte',
        reponse: 'catégorie de compte',
        typeEntity: 'cette catégorie de compte',
        entete: 'une catégorie de compte',
        addButton: true,
        code: '02410',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                field: 'code',
                type: 'select',
                value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [
                    {name: 'PREVOYANCE', value: 'PREVOYANCE'},
                    {name: 'EPARGNE', value: 'EPARGNE'},
                    {name: 'CREDIT', value: 'CREDIT'},
                    {name: 'INTERNE', value: 'INTERNE'},
                    {name: 'TONTINE', value: 'TONTINE'},
                    {name: 'GENERAL', value: 'GENERAL'}
                ]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '23rem'}]
    },

    'admin/type-compte-fr': {
        title: 'Gestion des types de compte',
        titre: 'Ajout un type de compte',
        titleFile: 'Liste des types de compte',
        sousTitle: 'un types de compte',
        url: 'type-compte',
        reponse: 'type de compte',
        typeEntity: 'ce type de compte',
        entete: 'un type de compte',
        addButton: true,
        code: '02420',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code','Libelle', 'Catégorie de compte', 'Nº compte general', 'Sens'],
        tabFileHead: ['Code', 'Libelle', 'Catégorie de compte', 'Nº compte general', 'Sens'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Compte Général',
                name: 'compteGeneral',
                type: 'select4',
                displayName: 'nom',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'compte-general',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Catégorie de compte',
                name: 'categorieCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'categorie-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Solde minimum',
                name: 'soldeMinimum',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Solde maximum',
                name: 'soldeMaximum',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Sens',
                name: 'sens',
                field: 'sens',
                type: 'select',
                value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [{name: 'DEBIT', value: 'DEBIT'}, {name: 'CREDIT', value: 'CREDIT'}, {
                    name: 'INDEFFERENT',
                    value: 'INDEFFERENT'
                }]
            },
        ],
        searchFields: [],
        tabBody: ['code','libelle', 'categorieCompte', 'compteGeneral', 'sens'],
        tabFileBody: ['code', 'libelle', 'soldeMaximum', 'compteGeneral', 'sens'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/compte-genere-fr': {
        title: 'Gestion des comptes interne',
        titre: 'Ajout un compte internehhhhh',
        titleFile: 'Liste des comptes interne',
        sousTitle: 'un compte interne',
        url: 'comptes-internes',
        reponse: 'compte interne',
        typeEntity: 'ce compte interne',
        entete: 'un compte interne',
        addButton: true,
        code: '02430',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Type compte', 'Nature Déduction', 'Clé', 'Libellé'],
        tabFileHead: ['Type compte', 'Nature Déduction', 'Clé', 'Libellé'],
        fields: [
            {
                fxFlex: '50',
                label: 'Type compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nature Déduction',
                name: 'natureDeduction',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'nature-deduction',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Clé',
                name: 'cle',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'tags-ecritures',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['numero', 'natureDeduction', 'cle', 'libelle'],
        tabFileBody: ['numero', 'natureDeduction', 'cle', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/postes-fr': {
        title: 'Gestion des postes',
        titre: 'Ajout un poste',
        titleFile: 'Liste des postes',
        sousTitle: 'un poste',
        url: 'poste',
        reponse: ' poste',
        typeEntity: 'ce poste',
        entete: 'un poste',
        addButton: true,
        code: '08530',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Intitule', 'Type','Description'],
        tabFileHead: ['Code', 'Intitule','type','Description'],
        fields: [

            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Intitule',
                name: 'intitule',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type',
                name: 'type',
                type: 'select',
                displayName: 'name',
                value: '',
                list: [{name:'Compte résultat' ,value:'COMPTE RESULTAT'},{name :'Bilan', value:'BILAN'}],
                url: '',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Description',
                name: 'description',
                type: 'textarea',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['code', 'intitule','type', 'description'],
        tabFileBody: ['code', 'intitule','type', 'description'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/chapitre-comptable-fr': {
        title: 'Gestion des chapitres comptables',
        titre: 'Ajout un chapitre comptable',
        titleFile: 'Liste des chapitres comptables',
        sousTitle: 'un chapitre comptable',
        url: 'chapitre-comptable',
        reponse: 'chapitre comptable',
        typeEntity: 'ce chapitre comptable',
        entete: 'un chapitre comptable',
        addButton: true,
        code: '02450',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code de regroupement', 'Code du chapitre', 'Libellé'],
        tabFileHead: ['Code de regroupement', 'Code du chapitre', 'Libellé'],
        fields: [
            {
                fxFlex: '100',
                label: 'Libellé du chapitre',
                name: 'libelleChapitre',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code de regroupement',
                name: 'codeRegroupement',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code du chapitre',
                name: 'codeChapitre',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['codeRegroupement', 'codeChapitre', 'libelleChapitre'],
        tabFileBody: ['codeRegroupement', 'codeChapitre', 'libelleChapitre'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/devise-fr': {
        title: 'Gestion des devises',
        titre: 'Ajout une devise',
        titleFile: 'Liste des devises',
        sousTitle: 'une devise',
        url: 'devise',
        reponse: 'devise',
        typeEntity: 'cette devise',
        entete: 'une devise',
        addButton: true,
        code: '02480',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code alpha devise', 'Code numérique', 'Currency', 'Indicative devise acceptée'],
        tabFileHead: ['Code alpha devise', 'Code numérique', 'Currency', 'Indicative devise acceptée'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code alpha devise',
                name: 'codeAlphaDevise',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code numérique',
                name: 'codeNumerique',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Currency',
                name: 'currency',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Indicative devise acceptée',
                name: 'indDeviseAcceptee',
                field: 'code',
                type: 'select',
                value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [{name: 'NON', value: 'false'}, {name: 'OUI', value: 'true'}]
            },
            {
                fxFlex: '50',
                label: 'Unité monetaire',
                name: 'uniteMonetaire',
                type: 'number',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Unité comptable',
                name: 'uniteComptable',
                type: 'number',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Minor currency unit',
                name: 'minorCurrencyUnit',
                type: 'number',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Format devise',
                name: 'formatDevise',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['codeAlphaDevise', 'codeNumerique', 'currency', 'indDeviseAcceptee'],
        tabFileBody: ['codeAlphaDevise', 'codeNumerique', 'currency', 'indDeviseAcceptee'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-depot-a-terme-fr': {
        title: 'Gestion des types de dépôt à terme',
        titre: 'Ajout un type dépôt à terme',
        titleFile: 'Liste des types de dépôt à terme',
        sousTitle: 'un type de dépôt à terme',
        url: 'type-depot-terme',
        reponse: 'Type de dépôt à terme',
        typeEntity: 'ce type dépôt à terme',
        entete: 'un type dépôt à terme',
        addButton: true,
        code: '02560',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Nbre MoisMax', 'Nbre MoisMin', 'Taux', 'TauxMax', 'TauxMin', 'Montant Max', 'Montant Min'],
        tabFileHead: ['Code', 'Libellé', 'Nbre MoisMax', 'Nbre MoisMin', 'Taux', 'TauxMax', 'TauxMin', 'Montant Max', 'Montant Min'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Nbre Mois min',
                name: 'nbreMoisMin',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Nbre Mois max',
                name: 'nbreMoisMax',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Taux A saisir',
                name: 'tauxASaisir',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            }
            , {
                fxFlex: '50',
                label: 'Taux',
                name: 'taux',
                type: 'text',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Taux Min',
                name: 'tauxMin',
                type: 'taux',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Taux Max',
                name: 'tauxMax',
                type: 'taux',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Montant Min',
                name: 'montantMin',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Montant Max',
                name: 'montantMax',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Taux Remboursement Anticipe',
                name: 'tauxRemboursementAnticipe',
                type: 'text',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Taux Avance',
                name: 'tauxAvance',
                type: 'text',
                isRequired: false,
                validations: []
            }
            , {
                fxFlex: '50',
                label: 'Type Compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte?categorieCompte=EPARGNE',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],

        searchFields: [
            {name: 'Code', field: 'code', type: 'text', value: ''},
            {name: 'Libellé', field: 'libelle', type: 'text', value: ''},
        ],
        tabBody: ['code', 'libelle', 'nbreMoisMax', 'nbreMoisMin', 'taux',
            'tauxMax', 'tauxMin', 'montantMax', 'montantMin'],
        tabFileBody: ['code', 'libelle', 'nbreMoisMax', 'nbreMoisMin', 'taux', 'tauxMax', 'tauxMin', 'montantMax', 'montantMin'],
        action: [
            {name: 'modifier', icon: 'edit', color: 'primary'},
            {name: 'supprimer', icon: 'delete', color: 'red'}
        ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/depot-a-terme-fr': {
        title: 'Gestion des dépôts à terme',
        titre: 'Ajout un dépôt à terme',
        titleFile: 'Liste des dépôts à terme',
        sousTitle: 'un dépôt à terme',
        url: 'depot-terme',
        reponse: 'dépôt à terme',
        typeEntity: 'ce dépôt à terme',
        entete: 'un dépôt à terme',
        addButton: true,
        code: '02660',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nº Client', 'Type DAT', 'Taux', 'Client', 'Nbre Mois', 'Montant', 'Intéret', 'Statut', 'Date création'],
        tabFileHead: ['Nº Client', 'Type DAT', 'Taux', 'Client', 'Nbre Mois', 'Montant', 'Interet', 'Statut', 'Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Type dépôt Terme',
                name: 'typeDepoTerme',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux',
                name: 'taux',
                type: 'text',
                value: 'depot',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Client',
                name: 'client',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'client',
                isRequired: true,
                list: [],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Solde compte courant',
                name: 'soldeCompte',
                type: 'text',
                isRequired: false,
                validations: []
            },
            {
                fxFlex: '50',
                label: 'Périodicité calcul intéret',
                name: 'periodiciteCalculInteret',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Mensuelle', id: '1'}, {name: 'Trimestrielle', id: '3'}, {
                    name: 'Semestrielle',
                    id: '6'
                }, {name: 'Annuelle', id: '12'}, {name: 'A Terme', id: '13'}]
            },
            {
                fxFlex: '50',
                label: 'Nombre Mois',
                name: 'nbreMois',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Récapitalisation Intéret',
                name: 'recapitalisationInteret',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Montant Depot',
                name: 'capitalInitial',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant Cumule Interet',
                name: 'montantCumuleInteret',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Montant Dernier InteretCalcule',
                name: 'montantDernierInteretCalcule',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
            ,

            {
                fxFlex: '50',
                label: 'Date début',
                name: 'dateDebut',
                type: 'date',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Date fin',
                name: 'dateFin',
                type: 'date',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Montant Intéret',
                name: 'montantInteret',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],

        searchFields: [
            {name: 'Nº Client', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Dépôt Terme', field: 'typeDepotTerme', type: 'select', value: '',
                isRequired: true,
                displayName: 'libelle',
                displayValue: 'libelle',
                list: [],
                url: 'type-depot-terme',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {name: 'Taux', field: 'taux', type: 'text', value: ''},
            {name: 'Montant dépôt', field: 'capitalInitial', type: 'text', value: ''},
            {
                name: 'Statut', field: 'statut', type: 'select', value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [{name: 'SAISI', value: 'SAISI'}, {name: 'VALIDE', value: 'VALIDE'}, {
                    name: 'CLOTURE',
                    value: 'CLOTURE'
                }]
            },
        ],
        tabBody: ['numero', 'typeDepotTerme', 'taux', 'client', 'nbreMois', 'capitalInitial', 'recapitalisationInteret', 'statut', 'createdAt'],
        tabFileBody: ['numero', 'typeDepotTerme', 'taux', 'client', 'nbreMois', 'capitalInitial', 'recapitalisationInteret', 'statut', 'createdAt'],
        action: [
            {name: 'modifier', icon: 'edit', color: 'primary'},
            {name: 'supprimer', icon: 'delete', color: 'red'},
            {name: 'detailDepot', icon: 'eye', color: 'primary'},
            {name: 'debloquer', icon: 'unlock', color: 'red'},
            {name: 'validate', icon: 'check', color: 'red'},
            {name: 'generate', icon: 'check', color: 'red'},
            {name: 'avance-dat', icon: 'check', color: 'red'},
        ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/depot-a-terme-valide-fr': {
        title: 'Gestion des validations de dépôts à terme',
        titre: 'Ajout un dépôt à terme',
        titleFile: 'Liste des dépôts à terme',
        sousTitle: 'un dépôt à terme',
        url: 'depot-terme',
        reponse: 'dépôt à terme',
        typeEntity: 'ce dépôt à terme',
        entete: 'un dépôt à terme',
        addButton: true,
        code: '02960',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nº Client', 'Type DAT', 'Taux', 'Client', 'Nbre Mois', 'Montant', 'Intéret', 'Statut'],
        tabFileHead: ['Nº Client', 'Type DAT', 'Taux', 'Client', 'Nbre Mois', 'Montant', 'Intéret', 'Statut'],
        fields: [
            {
                fxFlex: '50',
                label: 'Type dépôt Terme',
                name: 'typeDepoTerme',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux',
                name: 'taux',
                type: 'text',
                value: 'depot',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Client',
                name: 'client',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'client',
                isRequired: true,
                list: [],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Solde compte courant',
                name: 'soldeCompte',
                type: 'text',
                isRequired: false,
                validations: []
            },
            {
                fxFlex: '50',
                label: 'Périodicité calcul intéret',
                name: 'periodiciteCalculInteret',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Mensuelle', id: '1'}, {name: 'Trimestrielle', id: '3'}, {
                    name: 'Semestrielle',
                    id: '6'
                }, {name: 'Annuelle', id: '12'}, {name: 'A Terme', id: '13'}]
            },
            {
                fxFlex: '50',
                label: 'Nombre Mois',
                name: 'nbreMois',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Récapitalisation Intéret',
                name: 'recapitalisationInteret',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            }, {
                fxFlex: '50',
                label: 'Montant Depot',
                name: 'capitalInitial',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant Cumule Interet',
                name: 'montantCumuleInteret',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Montant Dernier InteretCalcule',
                name: 'montantDernierInteretCalcule',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
            ,

            {
                fxFlex: '50',
                label: 'Date début',
                name: 'dateDebut',
                type: 'date',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Date fin',
                name: 'dateFin',
                type: 'date',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Montant Intéret',
                name: 'montantInteret',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],

        searchFields: [
            {name: 'Nº Client', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Dépôt Terme', field: 'typeDepotTerme', type: 'select', value: '',
                isRequired: true,
                displayName: 'libelle',
                displayValue: 'libelle',
                list: [],
                url: 'type-depot-terme',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {name: 'Taux', field: 'taux', type: 'text', value: ''},
            {name: 'Montant dépôt', field: 'capitalInitial', type: 'text', value: ''},
            {
                name: 'Statut', field: 'statut', type: 'select', value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [{name: 'SAISI', value: 'SAISI'}, {name: 'VALIDE', value: 'VALIDE'}, {
                    name: 'CLOTURE',
                    value: 'CLOTURE'
                }]
            },
        ],
        tabBody: ['numero', 'typeDepotTerme', 'taux', 'client', 'nbreMois', 'capitalInitial', 'recapitalisationInteret', 'statut'],
        tabFileBody: ['numero', 'typeDepotTerme', 'taux', 'client', 'nbreMois', 'capitalInitial', 'recapitalisationInteret', 'statut'],
        action: [
            {name: 'modifier', icon: 'edit', color: 'primary'},
            {name: 'supprimer', icon: 'delete', color: 'red'},
            {name: 'detailDepot', icon: 'eye', color: 'primary'},
            {name: 'validate', icon: 'check', color: 'red'},
            {name: 'debloquer', icon: 'unlock', color: 'red'},
        ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/schema-comptable-fr': {
        title: 'Gestion des schémas comptables',
        titre: 'Ajout un schéma comptable',
        titleFile: 'Liste des schémas comptables',
        sousTitle: 'un schéma comptable',
        url: 'schema-comptable',
        reponse: 'schéma comptable',
        typeEntity: 'ce schéma comptable',
        entete: 'un schéma comptable',
        addButton: true,
        code: '02460',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Libelle', 'Date de création'],
        tabFileHead: ['Numéro', 'Libelle', 'Date de création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Numéro',
                name: 'numero',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [
            // { name: 'Numéro', field: 'numero', type: 'text', value: '' },
            // { name: 'Libellé', field: 'libelle', type: 'text', value: '' },
        ],
        tabBody: ['numero', 'libelle', 'dateCreated'],
        tabFileBody: ['numero', 'libelle', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'detailSchemaComptable', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },


    'admin/schema-ecriture-fr': {
        title: 'Gestion des schémas d\'écriture',
        titre: 'Ajout un schéma d\'écriture',
        titleFile: 'Liste des schémas d\'écritures',
        sousTitle: 'un schéma d\'écriture',
        url: 'schema-ecriture',
        reponse: 'schéma d\'écriture',
        typeEntity: 'ce schéma d\'écriture',
        entete: 'un schema d\'écriture',
        addButton: true,
        code: '01451',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Libelle', 'Schéma compatable', 'Tag Compte', 'Tag Montant', 'Sens Ecriture'],
        tabFileHead: ['Numéro', 'Libelle', 'Schéma compatable', 'Tag Compte', 'Tag Montant', 'Sens Ecriture'],
        fields: [
            {
                fxFlex: '50',
                label: 'Numéro',
                name: 'numero',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Schéma comptable',
                name: 'schemaComptable',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'schema-comptable',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Tag Compte',
                name: 'tagCompte',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Tag Montant',
                name: 'tagMontant',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Sens Ecriture',
                name: 'sensEcriture',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['numero', 'libelle', 'schemaComptable', 'tagCompte', 'tagMontant', 'sensEcriture'],
        tabFileBody: ['numero', 'libelle', 'schemaComptable', 'tagCompte', 'tagMontant', 'sensEcriture'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },


    'admin/evenement-comptable-fr': {
        title: 'Gestion des événements comptables',
        titre: 'Ajout un événement comptable',
        titleFile: 'Liste des événements comptables',
        sousTitle: 'un événement comptable',
        url: 'evenement-comptable',
        reponse: 'événement comptable',
        typeEntity: 'cet événement comptable',
        entete: 'un événement comptable',
        addButton: true,
        code: '02470',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Schéma compatable'],
        tabFileHead: ['Numéro', 'Libelle', 'Schéma compatable'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '100',
                label: 'Schéma comptable',
                name: 'schemaComptable',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'selectType',
                isRequired: true,
                list: [],
                url: 'schema-comptable',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [
            //   { name: 'Code', field: 'code', type: 'text', value: '' },
            //   { name: 'Libelle', field: 'libelle', type: 'text', value: '' },
            //   {
            //     name: 'Schéma comptable', field: 'schemaComptable',
            //     displayName: 'libelle',
            //     displayValue: 'libelle', type: 'select',
            //     typeSelect: 1, list: [], url: 'schema-comptable', value: ''
            // },
        ],
        tabBody: ['code', 'libelle', 'schemaComptable'],
        tabFileBody: ['code', 'libelle', 'schemaComptable'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/situation-matrimoniale-fr': {
        title: 'Gestion des situations matrimoniales',
        titre: 'Ajout une situation matrimoniale',
        titleFile: 'Liste des situations matrimoniales',
        sousTitle: 'une situation matrimoniale',
        url: 'situation-matrimoniale',
        reponse: 'situation matrimoniale',
        typeEntity: 'cette situation matrimoniale',
        entete: 'une situation matrimoniale',
        addButton: true,
        code: '02280',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/activite-client-fr': {
        title: 'Gestion des activités clients',
        titre: 'Ajout une activité client',
        titleFile: 'Liste des activités clients',
        sousTitle: 'une activité client',
        url: 'activite-client',
        reponse: 'activité client',
        typeEntity: 'cette activité client',
        entete: 'une activité client',
        addButton: true,
        code: '02230',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/sous-activite-client-fr': {
        title: 'Gestion des sous activités',
        titre: 'Ajout une sous activité',
        titleFile: 'Liste des sous activités',
        sousTitle: 'une sous activité',
        url: 'sous-activite-client',
        reponse: 'sous activité',
        typeEntity: 'cette sous activité',
        entete: 'sous activité',
        addButton: true,
        code: '02240',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Activité Client'],
        tabFileHead: ['Code', 'Libellé', 'Activité Client'],
        fields: [
            {
                fxFlex: '100',
                label: 'Rattaché à l\'activité',
                name: 'activiteClient',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'activite-client',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'activiteClient'],
        tabFileBody: ['code', 'libelle', 'activiteClient'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/nature-personne-morale-fr': {
        title: 'Gestion des natures de personnes morales',
        titre: 'Ajout une nature de personne morale',
        titleFile: 'Liste des natures de personnes morales',
        sousTitle: 'une nature de personne morale',
        url: 'nature-personne-morale',
        reponse: 'nature de personne morale',
        typeEntity: 'cette nature de personne morale',
        entete: 'nature de personne morale',
        addButton: true,
        code: '02250',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/capacite-juridique-fr': {
        title: 'Gestion des capacités juridiques',
        titre: 'Ajout une capacité juridique',
        titleFile: 'Liste des capacités juridiques',
        sousTitle: 'une capacité juridique',
        url: 'capacite-juridique',
        reponse: 'capacité juridique',
        typeEntity: 'cette capacité juridique',
        entete: 'capacité juridique',
        addButton: true,
        code: '02270',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/regime-matrimonial-fr': {
        title: 'Gestion des régimes matrimoniaux',
        titre: 'Ajout un régime matrimonial',
        titleFile: 'Liste des régime matrimoial',
        sousTitle: 'un régime matrimonial',
        url: 'regime-matrimonial',
        reponse: 'régime matrimonial',
        typeEntity: 'ce régime matrimonial ',
        entete: 'régime matrimonial',
        addButton: true,
        code: '02290',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '100',
                label: 'Situation matiomoniale',
                name: 'situationMatrimoniale',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'situation-matrimoniale',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/qualite-fr': {
        title: 'Gestion des qualités client',
        titre: 'Ajout une qualité client',
        titleFile: 'Liste des qualités client',
        sousTitle: 'une qualité client',
        url: 'qualite',
        reponse: 'qualité client',
        typeEntity: 'cette qualité client',
        entete: 'qualité client',
        addButton: true,
        code: '02320',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/employeurs-fr': {
        title: 'Gestion des employeurs',
        titre: 'Ajout un employeur',
        titleFile: 'Liste des employeurs',
        sousTitle: 'un employeur',
        url: 'employeur',
        reponse: 'employeur',
        typeEntity: 'cet employeur',
        entete: 'employeur',
        addButton: true,
        code: '02330',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/statut-juridique-fr': {
        title: 'Gestion des statuts juridiques',
        titre: 'Ajout un statut juridique',
        titleFile: 'Liste des statuts juridiques',
        sousTitle: 'un statut juridique',
        url: 'statut-juridique',
        reponse: 'statut juridique',
        typeEntity: 'ce statut juridique',
        entete: 'statut juridique',
        addButton: true,
        code: '02310',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '100',
                label: 'Type',
                name: 'naturePersonneMorale',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'code',
                value: '',
                isRequired: true,
                list: [],
                url: 'nature-personne-morale',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/categorie-client-fr': {
        title: 'Gestion des catégories de client',
        titre: 'Ajout une catégorie de client',
        titleFile: 'Liste des catégories de clients',
        sousTitle: 'une catégorie de client',
        url: 'categorie-client',
        reponse: 'catégorie de client',
        typeEntity: 'cette catégorie de client',
        entete: 'catégorie de client',
        addButton: true,
        code: '02210',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Type Client'],
        tabFileHead: ['Code', 'Libelle', 'Type Client'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: "Droit d'adhésion", name: "droitAdhesion", type: 'text', isRequired: true, validations: [{ name: "required", value: 'Validators.required', message: "Ce champ est obligatoire" }] },
            {
                fxFlex: '100',
                label: 'Nombre maximale de membre',
                name: 'nbreMembreMaxMultiplier',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Nombre maximale de membre', name: 'nbreMembreMaxMultiplier', type: 'number', displayName: 'name',displayValue: 'id', value: '', isRequired: true, list: [{ name: "OUI", id: true }, { name: "NON", id: false }], url: '', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            {
                fxFlex: '50',
                label: 'Multiplier par nombre de membre',
                name: 'aMultiplierParNbreMembre',
                type: 'matSlideToggle',
                displayName: 'name',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [{name: 'OUI', id: true}, {name: 'NON', id: false}],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'typeClient'],
        tabFileBody: ['code', 'libelle', 'typeClient'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/fonction-membre-fr': {
        title: 'Gestion des fonctions membres',
        titre: 'Ajout une fonction membre',
        titleFile: 'Liste des fonctions membre',
        sousTitle: 'une fonction membre',
        url: 'fonction-membre',
        reponse: 'fonction membre',
        typeEntity: 'cette fonction membre',
        entete: 'fonction membre',
        addButton: true,
        code: '02260',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/banque-fr': {
        title: 'Gestion des banques',
        titre: 'Ajout une banque',
        titleFile: 'Liste des banques',
        sousTitle: 'une banque',
        url: 'banque',
        reponse: 'banque',
        typeEntity: 'cette banque',
        entete: 'banque',
        addButton: true,
        code: '02170',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Relevé d\'Identité Bancaire'],
        tabFileHead: ['Code', 'Libelle', 'Relevé d\'Identité Bancaire'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Relevé d\'Identité Bancaire',
                name: 'rib',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Type de compte', name: 'typeCompte', type: 'select', displayName: 'libelle',displayValue: 'id', value: '', isRequired: true, list: [], url: 'type-compte', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            // { fxFlex: '50', label: 'Compte', name: 'compte', type: 'select', displayName: 'numero',displayValue: 'id', value: '', isRequired: true, list: [], url: 'compte', validations: [] },
            {
                fxFlex: '50',
                label: 'Logo',
                name: 'logo',
                type: 'file',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'rib'],
        tabFileBody: ['code', 'libelle', 'rib'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'detailBanque', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-client-fr': {
        title: 'Gestion des types de clients',//le titre dans l'entete
        titre: 'Ajout un type de client',//le titre du modal d'ajout
        titleFile: 'Liste des types de cliente',//q??
        sousTitle: 'un type de client',//q??
        url: 'type-client',//l'url du backend à contacter
        reponse: 'type-client',//q??
        typeEntity: 'ce type de client',//q??
        entete: 'un type client',//q??
        addButton: true,//
        code: '02220',//code qui gere les permissions
        filterType: 'local',//q??
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Part sociale', 'Type personne'],//l'entete du tableau
        tabFileHead: ['Code', 'Libelle', 'Part sociale', 'Type personne'],//q??
        //les champs à charger sur le formulaire d'ajout
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Part sociale',
                name: 'partSocial',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type personne',
                name: 'typePersonne',
                type: 'select',
                value: '',
                displayName: 'name',
                url: '',
                displayValue: 'value',
                list: [{name: 'Personne physique', value: 'PP'}, {name: 'Personne morale ', value: 'PM'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'partSocial', 'typePersonne'],//les données provenant du back à afficher
        tabFileBody: ['code', 'libelle', 'partSocial', 'typePersonne'],//q??
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },


    'admin/caisse-fr': {
        title: 'Gestion des caisses',
        titre: 'Ajout une caisse',
        titleFile: 'Liste des caisses',
        sousTitle: 'une caisse',
        url: 'get-caisses-by-agence',
        reponse: 'une caisse',
        typeEntity: 'cette caisse',
        entete: 'une caisse',
        addButton: true,
        code: '02130',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nom', 'Agence', 'Type de caisse', 'Créer par', 'Caissier', 'Statut', 'Date de création'],
        tabFileHead: ['Nom', 'Agence', 'Type de caisse', 'Créer par', 'Caissier', 'Statut', 'Date de création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Type de caisse',
                name: 'typeCaisse',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Principale', id: 'PRINCIPALE'}, {name: 'Auxiliaire', id: 'AUXILIAIRE'}]
            },
            {
                fxFlex: '50',
                label: 'libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Agence',
                name: 'agence',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'agence',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['libelle', 'agence', 'typeCaisse', 'userCreate', 'caissier', 'statut', 'dateCreated'],
        tabFileBody: ['libelle', 'agence', 'typeCaisse', 'userCreate', 'caissier', 'statut', 'dateCreated'],
        action: [
            {name: 'modifier', icon: 'edit', color: 'primary'},
           // {name: 'supprimer', icon: 'delete', color: 'red'},
            {name: 'detailCaisse', icon: 'eyes', color: 'green'}
        ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/caisseAffecter-fr': {
        title: 'Affectation de caisses',
        titre: 'Ajout une caisse',
        titleFile: 'Liste des caisses',
        sousTitle: 'une caisse',
        url: 'get-caisses-by-agence',
        reponse: 'une caisse',
        typeEntity: 'cette caisse',
        entete: 'une caisse',
        addButton: true,
        code: '04120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nom', 'Agence', 'Type de caisse', 'Créer par', 'Caissier', 'Statut', 'Date de création'],
        tabFileHead: ['Nom', 'Agence', 'Type de caisse', 'Créer par', 'Caissier', 'Statut', 'Date de création'],
        fields: [],
        searchFields: [],
        tabBody: ['libelle', 'agence', 'typeCaisse', 'userCreate', 'caissier', 'statut', 'dateCreated'],
        tabFileBody: ['libelle', 'agence', 'typeCaisse', 'userCreate', 'caissier', 'statut', 'dateCreated'],
        action: [{name: 'affectationCaisse', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-tracking-fr': {
        title: 'Gestion des tracking type',
        titre: 'Ajout une tracking type',
        titleFile: 'Liste des tracking types',
        sousTitle: 'une tracking type',
        url: 'types-tracking',
        reponse: 'une tracking type',
        typeEntity: 'cette tracking type',
        entete: 'une tracking type',
        addButton: true,
        code: '076240',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Categorie client', 'Nature controle', 'Statut', 'Sens', 'Periodicite transaction', 'Montant', 'Commentaires'],
        tabFileHead: ['Code', 'Libelle', 'Categorie', 'Nature', 'Statut', 'Sens', 'Periodicite', 'Montant'],
        fields: [

            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Categorie client',
                name: 'categorieClient',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'libelle',
                displayValue: 'code',
                url: 'categorie-client',
                list: []
            },
            {
                fxFlex: '50',
                label: 'Sens',
                name: 'sens',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Debit', id: 'DEBIT'}, {name: 'Credit', id: 'CREDIT'}]
            }, {
                fxFlex: '50',
                label: 'Statut',
                name: 'statut',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'SURVEILLE', id: 'SURVEILLE'}, {name: 'INTERDIT', id: 'INTERDIT'}]
            },
            {
                fxFlex: '50',
                label: 'Periodicite transaction',
                name: 'periodiciteTransaction',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Jour', id: 'JOUR'}, {name: 'Mensuelle', id: 'MENSUELLE'}]
            }, {
                fxFlex: '50',
                label: 'Nature Controle',
                name: 'natureControle',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'},],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Montant', id: 'MONTANT'}, {name: 'Volume', id: 'VOLUME'}]
            }, {
                fxFlex: '50',
                label: 'Commentaire',
                name: 'commentaires',
                type: 'textarea',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant',
                name: 'montant',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }, {
                fxFlex: '50',
                label: 'Volume',
                name: 'volume',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'categorieClient', 'natureControle', 'statut', 'sens', 'periodiciteTransaction', 'montant', 'commentaires'],
        tabFileBody: ['code', 'libelle', 'categorieClient', 'natureControle', 'statut', 'sens', 'periodiciteTransaction', 'montant',],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-billetage-fr': {
        title: 'Gestion des types de billetage',
        titre: 'Ajout un type de billetage',
        titleFile: 'Liste des type de billetage',
        sousTitle: 'un type de billetage',
        url: 'type-billetage',
        reponse: 'type de billetage',
        typeEntity: 'ce type de billetage',
        entete: 'type de billetage',
        addButton: true,
        code: '02150',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Type', 'Valeur', 'Devise', 'Séquence Affichage', 'Date création'],
        tabFileHead: ['Code', 'Libellé', 'Type', 'Valeur', 'Devise', 'Séquence Affichage', 'Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Valeur',
                name: 'valeur',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: "Devise", name: "codeAlphaDevise", type: 'text', isRequired: true, validations: [{ name: "required", value: 'Validators.required', message: "Ce champ est obligatoire" }] },
            {
                fxFlex: '50',
                label: 'Devise',
                name: 'codeAlphaDevise',
                type: 'select',
                displayName: 'codeAlphaDevise',
                displayValue: 'codeAlphaDevise',
                value: '',
                isRequired: true,
                list: [],
                url: 'devise',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux billetage',
                name: 'tauxBilletage',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Sequence Affichage',
                name: 'sequenceAffichage',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '100',
                label: 'Type',
                name: 'type',
                type: 'select',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}],
                displayName: 'name',
                displayValue: 'id',
                url: '',
                list: [{name: 'Billet', id: 'BILLET'}, {name: 'Pièce', id: 'PIECE'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'type', 'valeur', 'codeAlphaDevise', 'sequenceAffichage', 'dateCreated'],
        tabFileBody: ['code', 'libelle', 'type', 'valeur', 'codeAlphaDevise', 'sequenceAffichage', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/produit-entite-fr': {
        title: 'Gestion des produits entité',
        titre: 'Ajout un produit entité',
        titleFile: 'Liste des produits entité',
        sousTitle: 'un produit entité',
        url: 'produit-entite',
        reponse: 'produit entité',
        typeEntity: 'ce produit entité',
        entete: 'produit entité',
        addButton: true,
        code: '01410',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code du produit', 'Type de produit'],
        tabFileHead: ['Code du produit', 'Type de produit'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code du produit',
                name: 'codeProduit',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de produit',
                name: 'typeProduit',
                type: 'select',
                displayName: 'name',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [{name: 'crédit', id: 'CREDIT'}, {name: 'compte', id: 'COMPTE'}, {
                    name: 'épargne',
                    id: 'EPARGNE'
                }],
                url: 'type-produit',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['codeProduit', 'typeProduit'],
        tabFileBody: ['codeProduit', 'typeProduit'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/frais-fr': {
        title: 'Gestion des frais',
        titre: 'Ajouter un frais',
        titleFile: 'Liste des frais',
        sousTitle: 'un frais',
        url: 'frais',
        reponse: 'frais',
        typeEntity: 'ce frais',
        entete: 'un frais',
        addButton: true,
        code: '02510',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Montant min frais', 'Montant max frais', 'Frais automatique'],
        tabFileHead: ['Code', 'Libellé', 'Montant min frais', 'Montant max frais', 'Frais automatique'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant min frais',
                name: 'montantMinFrais',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant max frais',
                name: 'montantMaxFrais',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de compte',
                name: 'typeCompte',
                type: 'select0',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Frais automatique',
                name: 'isAuto',
                type: 'matSlideToggle',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: ' "Ce champ est obligatoire"'}],
                displayName: 'name',
                displayValue: 'id',
                list: []
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'montantMinFrais', 'montantMaxFrais', 'isAuto'],
        tabFileBody: ['code', 'libelle', 'montantMinFrais', 'montantMaxFrais', 'isAuto'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/penalite-param-fr': {
        title: 'Gestion des pénalites',
        titre: 'Ajouter une pénalite',
        titleFile: 'Liste des pénalites',
        sousTitle: 'une pénalite',
        url: 'penalite-param',
        reponse: 'penalite',
        typeEntity: 'cette penalite',
        entete: 'une pénalite',
        addButton: true,
        code: '09410',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Montant', 'Taux journalier', 'Montant Min Credit', 'Montant Max Credit'],
        tabFileHead: ['Montant', 'Taux journalier', 'Montant Min Credit', 'Montant Max Credit'],
        fields: [
            {
                fxFlex: '50',
                label: 'Montant',
                name: 'montant',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux journalier',
                name: 'taux',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant Min Credit',
                name: 'montantMinCredit',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant Max Credit',
                name: 'montantMaxCredit',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['montant', 'taux', 'montantMinCredit', 'montantMaxCredit'],
        tabFileBody: ['montant', 'taux', 'montantMinCredit', 'montantMaxCredit'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/compte-general-fr': {
        title: 'Gestion des comptes généraux',
        titre: 'Ajout un compte général',
        titleFile: 'Liste des comptes généraux',
        sousTitle: 'un compte général',
        url: 'compte-general',
        reponse: 'compte général',
        typeEntity: 'ce compte général',
        entete: 'un compte général',
        addButton: true,
        code: '02440',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Nom', 'Chapitre comptable'],
        tabFileHead: ['Numéro', 'Nom', 'Chapitre comptable'],
        fields: [
            {
                fxFlex: '50',
                label: 'Numéro Compte Général',
                name: 'numero',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé Compte Général',
                name: 'nom',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Agence', name: 'agence', type: 'select', displayName: 'libelle',displayValue: 'id', value: '', isRequired: true, list: [], url: 'agence', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            {
                fxFlex: '50',
                label: 'Chapitre comptable',
                name: 'chapitreComptable',
                type: 'select',
                displayName: 'codeChapitre',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'chapitre-comptable',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Type compte', name: 'typeCompte', type: 'select', displayName: 'libelle',displayValue: 'id', value: '', isRequired: true, list: [], url: 'type-compte', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            {
                fxFlex: '50',
                label: 'Devise',
                name: 'devise',
                type: 'select',
                displayName: 'codeAlphaDevise',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'devise',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: "Solde du compte", name: "soldeCompte", type: 'number', isRequired: true, validations: [{ name: "required", value: 'Validators.required', message: "Ce champ est obligatoire" }] },
        ],
        searchFields: [],
        tabBody: ['numero', 'nom', 'chapitreComptable'],
        tabFileBody: ['numero', 'nom', 'chapitreComptable'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'detail', icon: 'duplicate', color: 'red'}, {name: 'duplicate', icon: 'duplicate', color: 'red'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },
    'admin/compte-fr': {
        title: 'Gestion des comptes',
        titre: 'Ajout un compte',
        titleFile: 'Liste des comptes',
        sousTitle: 'un compte',
        url: 'compte',
        reponse: 'compte',
        typeEntity: 'ce compte',
        entete: 'un compte',
        addButton: true,
        code: '06110',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Intitulé', 'Date Ouverture', 'Statut compte'],
        tabFileHead: ['Numéro', 'Intitulé', 'Date Ouverture', 'Statut'],
        fields: [
            // { fxFlex: '100', label: "Numéro", name: "numero", type: 'text', isRequired: true, validations: [{ name: "required", value: 'Validators.required', message: "Ce champ est obligatoire" }] },
            {
                fxFlex: '50',
                label: 'Nom',
                name: 'nom',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Agence',
                name: 'agence',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'agence',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Numéro du compte général',
                name: 'compteGeneral',
                type: 'select',
                displayName: 'numero',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'compte-general',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Matricule du client',
                name: 'client',
                type: 'select',
                displayName: 'matricule',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'client',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Devise',
                name: 'devise',
                type: 'select',
                displayName: 'codeNumerique',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'devise',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['numero', 'nom', 'dateOuverture', 'statut'],
        tabFileBody: ['numero', 'nom', 'dateOuverture', 'statut'],
        action: [{name: 'detail-compte', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },

    'admin/condition-adhesion-fr': {
        title: 'Gestion des conditions d\'adhésion',
        titre: 'Ajout une condition d\'adhésion',
        titleFile: 'Liste des conditions d\'adhésion',
        sousTitle: 'une condition d\'adhésion',
        url: 'condition-adhesion',
        reponse: 'une condition d\'adhésion',
        typeEntity: 'cette condition d\'adhésion',
        entete: 'condition d\'adhésion',
        addButton: true,
        code: '02340',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Type', 'Référence'],
        tabFileHead: ['Code', 'Libelle', 'Type', 'Référence'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type',
                name: 'type',
                type: 'select',
                displayName: 'name',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [{name: 'CREDIT', id: 'CREDIT'}, {name: 'EPARGNE', id: 'EPARGNE'}, {
                    name: 'COMPTE',
                    id: 'COMPTE'
                }, {name: 'FRAIS ADHESION', id: 'FRAIS_ADHESION'}, {name: 'PART SOCIALE', id: 'PART_SOCIALE'}],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Référence produit',
                name: 'referenceProduit',
                type: 'text',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'typeProduit', 'referenceProduit'],
        tabFileBody: ['code', 'libelle', 'typeProduit', 'referenceProduit'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-transaction-fr': {
        title: 'Gestion des types de transaction',
        titre: 'Ajout un type de transaction',
        titleFile: 'Liste des type de transaction',
        sousTitle: 'un type de transaction',
        url: 'type-transaction',
        reponse: 'type de transaction',
        typeEntity: 'ce type de transaction',
        entete: 'type de transaction',
        addButton: false,
        code: '02140',
        tabHead: ['Code', 'Libelle', 'Date création'],
        tabFileHead: ['Code', 'Libelle', 'Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Libelle', name: 'libelle', type: 'select', displayName: 'libelle',displayValue: 'id', value: '', isRequired: true, list: [], url: 'agence', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'dateCreated'],
        tabFileBody: ['code', 'libelle', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/programme-credit-fr': {
        title: 'Gestion des programmes de crédit',
        titre: 'Ajout un programme de crédit',
        titleFile: 'Liste des programmes de crédit',
        sousTitle: 'une programme de crédit',
        url: 'programme',
        reponse: 'programme de crédit',
        typeEntity: 'ce programme de crédit',
        entete: 'programme de crédit',
        addButton: true,
        code: '02720',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Taux Entrée', 'Taux Sortie','Ressource Affecte', 'Date création'],
        tabFileHead: ['Code', 'Libelle', 'Taux Entrée', 'Taux Sortie','Ressource Affecte','Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux Entré',
                name: 'tauxEntree',
                type: 'number',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux Sorti',
                name: 'tauxSortie',
                type: 'number',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Ressource Affecté',
                name: 'ressourceAffecte',
                value: false,
                type: 'matSlideToggle',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'tauxEntree', 'tauxSortie','ressourceAffecte','createdAt'],
        tabFileBody: ['code', 'libelle', 'tauxEntree', 'tauxSortie', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-garantie-fr': {
        title: 'Gestion des Types de Garanties',
        titre: 'Ajout un type de garantie',
        titleFile: 'Liste des types de garanties',
        sousTitle: 'un type de garanties',
        url: 'type-garantie',
        reponse: 'un type de garanties',
        typeEntity: 'ce type de garanties',
        entete: 'type de garanties',
        addButton: true,
        code: '02730',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Hors Bilan'],
        tabFileHead: ['Code', 'Libelle', 'Hors Bilan'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Hors Bilan', name: 'horsBilan', type: 'matSlideToggle', displayName: 'name',displayValue: 'id', value: '', isRequired: false, list: [{ name: "OUI", id: true }, { name: "NON", id: false }], url: '', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            {
                fxFlex: '50',
                label: 'Hors Bilan',
                name: 'horsBilan',
                type: 'matSlideToggle',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: ' "Ce champ est obligatoire"'}],
                displayName: 'name',
                displayValue: 'id',
                list: []
            },

            // { fxFlex: '50', label: 'Condition', name: 'conditionTypeGarantie', type: 'select', displayName: 'name',displayValue: 'value', value: '', isRequired: true,list: [{ name: 'CLIENT', value: 'CLIENT' }, { name: 'GENERALE', value: 'GENERALE' },{ name: 'CATEGORIE CLIENT', value: 'CATEGORIE_CLIENT' }], url: '', validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}] },
            // { fxFlex: '50', label: 'Taux', name: 'taux', type: 'number', isRequired: true, validations: [{ name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire' }]},
            // { fxFlex: '50', label: 'Montant', name: 'montant', type: 'number', isRequired: true, validations: [{ name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire' }]},
            // { fxFlex: '50', label: 'Montant minimal crédit', name: 'montantMinCredit', type: 'number', isRequired: true, validations: [{ name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire' }]},
            // { fxFlex: '50', label: 'Montant maximal crédit', name: 'montantMaxCredit', type: 'number', isRequired: true, validations: [{ name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire' }]},

        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'horsBilan'],
        tabFileBody: ['code', 'libelle', 'horsBilan'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-assurance-fr': {
        title: 'Gestion des types d\'assurances',
        titre: 'Ajout un type d\'assurances',
        titleFile: 'Liste des types d\'assurances',
        sousTitle: 'un type d\'assurances',
        url: 'type-assurance',
        reponse: 'un type d\'assurance',
        typeEntity: 'ce type d\'assurance',
        entete: 'type d\'assurance',
        addButton: true,
        code: '02740',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code','Libelle','Type Compte','Nºcompte général', 'Taux', 'Montant minimal', 'Montant maximal'],
        tabFileHead: ['Code', 'Taux', 'Montant minimal', 'Montant maximal'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },{
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },{
                fxFlex: '50',
                label: 'Type Compte',
                name: 'typeCompte',
                type: 'select0',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'selectType',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux',
                name: 'taux',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant minimal',
                name: 'montantMinCredit',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant maximal',
                name: 'montantMaxCredit',
                type: 'montant',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }

        ],
        searchFields: [],
        tabBody: ['code','libelle','typeCompte','typeComptes', 'taux', 'montantMinCredit', 'montantMaxCredit'],
        tabFileBody: ['code', 'taux', 'montantMinCredit', 'montantMaxCredit'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/credit-fr': {
        title: 'Liste des Dossiers de Crédits',
        titre: 'Ajout un crédit',
        titleFile: 'Liste des dossiers',
        sousTitle: 'un dossier',
        url: 'credits',
        reponse: 'un crédit',
        typeEntity: 'ce crédit',
        entete: 'crédit',
        addButton: false,
        code: '07110',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nº', 'Clients', 'Matricule', 'Type Crédit', 'Montant','Montant restant du', 'Taux', 'Nbre Echéance', 'Statut', 'Date création','Ancien numéro'],
        tabFileHead: ['Numéro', 'Client', 'Type Crédit', 'Montant', 'Montant restant du','Taux', 'Nombre Echéance', 'Statut','Ancien numéro', 'Date création'],
        fields: [],
        searchFields: [
            {name: 'Numéro', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Crédit', field: 'typeCredit',
                displayName: 'libelle',
                displayValue: 'libelle', type: 'select',
                typeSelect: 1, list: [], url: 'type-credit', value: ''
            },
            {name: 'Matricule client', field: 'client', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''},
        ],
        tabBody: ['numero', 'client', 'matricule', 'typeCredit', 'montant','capitalRestantDu', 'taux', 'nombreEcheance', 'statut','createdAt','ancienNumero'],
        tabFileBody: ['numero', 'client', 'typeCredit', 'montant', 'capitalRestantDu','taux', 'nombreEcheance', 'statut', 'ancienNumero','createdAt'],
        action: [{name: 'detail-credit', icon: 'detail-credit', color: 'primary'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/credit-valide-fr': {
        title: 'Gestion Validation Dossiers',
        titre: 'Ajout un crédit',
        titleFile: 'Liste des dossiers valides',
        sousTitle: 'un dossier',
        url: 'credits-saisi',
        reponse: 'un crédit',
        typeEntity: 'ce crédit',
        entete: 'crédit',
        addButton: false,
        code: '07120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Clients','Matricule', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        tabFileHead: ['Numéro', 'Client', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        fields: [],
        searchFields: [
            {name: 'Numéro', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Crédit', field: 'typeCredit',
                displayName: 'libelle',
                displayValue: 'libelle', type: 'select',
                typeSelect: 1, list: [], url: 'type-credit', value: ''
            },
            // { name: 'Matricule client', field: 'client',
            // displayName: 'matricule',
            // displayValue: 'matricule', type: 'select-autocomplete',
            // typeSelect: 1, list: [], url: 'client', value: '' },
            {name: 'Matricule client', field: 'client', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''},
        ],
        tabBody: ['numero', 'client','matricule', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'createdAt'],
        tabFileBody: ['numero', 'client', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'createdAt'],
        action: [{name: 'detail-credit', icon: 'detail-credit', color: 'primary'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/demande-credit-fr': {
        title: 'Liste des Demandes de Crédits',
        titre: 'Ajout une demande crédit',
        titleFile: 'Liste des demandes de credits',
        sousTitle: 'une demande credit',
        url: 'demandes-credits',
        reponse: 'une demance crédit',
        typeEntity: 'cette demande de crédit',
        entete: 'demande de credit',
        addButton: true,
        code: '07410',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Clients',  'Type Crédit', 'Montant demandé', 'Montant accordé', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        tabFileHead: ['Numéro', 'Client', 'Type Crédit', 'Montant demandé', 'Montant accordé', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        fields: [],
        searchFields: [
            {name: 'Numéro', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Crédit', field: 'typeCredit',
                displayName: 'libelle',
                displayValue: 'libelle', type: 'select',
                typeSelect: 1, list: [], url: 'type-credit', value: ''
            },
            {name: 'Matricule client', field: 'client', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''},
        ],
        tabBody: ['numero', 'client', 'typeCredit', 'montant','montantAccorde', 'taux', 'nombreEcheance', 'statut', 'dateCreated'],
        tabFileBody: ['numero', 'client', 'typeCredit', 'montant','montantAccorde', 'taux', 'nombreEcheance', 'statut', 'dateCreated'],
        action: [{name: 'detail-template', icon: 'detail-credit', color: 'primary'},{name: 'validation-credit', icon: 'validation-credit', color: 'primary'},{name: 'validation-commite', icon: 'validation-credit', color: 'primary'},{name: 'rejeter-demande', icon: 'rejeter-demande', color: 'primary'},
            ],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/demande-credit-valide-fr': {
        title: 'Gestion Validation de demandes credits',
        titre: 'Ajout une demande crédit',
        titleFile: 'Liste des validations de demandes credits',
        sousTitle: 'un dossier',
        url: 'demandes-credits',
        reponse: 'un crédit',
        typeEntity: 'ce crédit',
        entete: 'demande de credits',
        addButton: false,
        code: '07510',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Clients', 'Matricule', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        tabFileHead: ['Numéro', 'Client', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        fields: [],
        searchFields: [
            {name: 'Numéro', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Crédit', field: 'typeCredit',
                displayName: 'libelle',
                displayValue: 'libelle', type: 'select',
                typeSelect: 1, list: [], url: 'type-credit', value: ''
            },
            // { name: 'Matricule client', field: 'client',
            // displayName: 'matricule',
            // displayValue: 'matricule', type: 'select-autocomplete',
            // typeSelect: 1, list: [], url: 'client', value: '' },
            {name: 'Matricule client', field: 'client', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''},
        ],
        tabBody: ['numero', 'client', 'matricule', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'dateCreated'],
        tabFileBody: ['numero', 'client', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'dateCreated'],
        action: [{name: 'detail-template', icon: 'detail-credit', color: 'primary'} ,{name: 'validation-credit', icon: 'validation-credit', color: 'primary'},{name: 'validation-commite', icon: 'validation-credit', color: 'primary'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },

    'admin/credit-finance-fr': {
        title: 'Gestion Financement Dossiers',
        titre: 'Ajout un crédit',
        titleFile: 'Liste des dossiers financés',
        sousTitle: 'un dossier',
        url: 'credits-valide',
        reponse: 'un crédit',
        typeEntity: 'ce crédit',
        entete: 'crédit',
        addButton: false,
        code: '07130',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numéro', 'Clients', 'Matricule', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        tabFileHead: ['Numéro', 'Client', 'Type Crédit', 'Montant', 'Taux', 'Nombre Echéance', 'Statut', 'Date création'],
        fields: [],
        searchFields: [
            {name: 'Numéro', field: 'numero', type: 'text', value: ''},
            {
                name: 'Type Crédit', field: 'typeCredit',
                displayName: 'libelle',
                displayValue: 'libelle', type: 'select',
                typeSelect: 1, list: [], url: 'type-credit', value: ''
            },
            {name: 'Matricule client', field: 'client', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''},
        ],
        tabBody: ['numero', 'client', 'matricule', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'createdAt'],
        tabFileBody: ['numero', 'client', 'typeCredit', 'montant', 'taux', 'nombreEcheance', 'statut', 'createdAt'],
        action: [{name: 'detail-credit', icon: 'detail-credit', color: 'primary'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-epargne-fr': {
        title: 'Gestion des types d\'épargnes',
        titre: 'Ajout un type d\'épargne',
        titleFile: 'Liste des types d\'épargnes',
        sousTitle: 'un type d\'épargne',
        url: 'type-epargne',
        reponse: 'type d\'épargne',
        typeEntity: 'ce type d\'épargne',
        entete: 'un type d\'épargne',
        addButton: true,
        code: '01471',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Taux', 'Montant', 'Montant minimal', 'Montant maximal'],
        tabFileHead: ['Code', 'Libellé', 'Taux', 'Montant', 'Montant minimal', 'Montant maximal'],
        fields: [
            {
                fxFlex: '100',
                label: 'Nature de l\'épargne',
                name: 'nature',
                type: 'select',
                value: '',
                displayName: 'name',
                displayValue: 'value',
                list: [{name: 'épargne à terme', value: 'EPARGNE_A_TERME'}, {
                    name: 'épargne logment',
                    value: 'EPARGNE_LOGEMENT'
                }, {name: 'épargne éducation', value: 'EPARGNE_EDUCATION'}, {
                    name: 'épargne retraite',
                    value: 'EPARGNE_RETRAITE'
                }, {name: 'épargne plan épargne', value: 'EPARGNE_PLAN_EPARGNE'}]
            },
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Durée minimale en jour',
                name: 'dureeMinJour',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Durée maximale en jour',
                name: 'dureeMaxJour',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux minimal',
                name: 'tauxMin',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux maximale',
                name: 'tauxMax',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux',
                name: 'taux',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux à saisir',
                name: 'tauxAsaisir',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Taux de la pénalité',
                name: 'tauxPenalite',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant minimal',
                name: 'montantMin',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant maximal',
                name: 'montantMax',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Compte général',
                name: 'compteGeneral',
                type: 'select',
                displayName: 'nom',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'compte-general',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Péridicité du paiement',
                name: 'periodicitePaiementInteret',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'periodicite',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Annuité',
                name: 'annuite',
                type: 'select',
                value: '',
                displayName: 'name',
                displayValue: 'value',
                list: [{name: 'échéance début période', value: 'ECHEANCE_DEBUT_PERIODE'}, {
                    name: 'échéance fin période',
                    value: 'ECHEANCE_FIN_PERIODE'
                }]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'taux', 'montant', 'montantMin', 'montantMax'],
        tabFileBody: ['code', 'libelle', 'taux', 'montant', 'montantMin', 'montantMax'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'duplicate', icon: 'duplicate', color: 'red'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },

    'admin/type-compte-credit-fr': {
        title: 'Gestion des Comptes Type Crédit',
        titre: 'Ajout un Compte Type Crédit',
        titleFile: 'Liste des Compte Type Crédit',
        sousTitle: 'un compte type crédit',
        url: 'compte-type-credit',
        reponse: 'compte type crédit',
        typeEntity: 'ce compte type crédit',
        entete: 'un compte type crédit',
        addButton: true,
        code: '02750',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nature Compte', 'Date Création'],
        tabFileHead: ['Nature Compte', 'Date Création'],
        fields: [
            // { fxFlex: '50', label: "Nature Compte", name: "natureCompte", type: 'text', isRequired: true, validations: [{ name: "required", value: 'Validators.required', message: "Ce champ est obligatoire" }] },
            {
                fxFlex: '50',
                label: 'Nature Compte',
                name: 'natureCompte',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: true,
                list: [{name: 'COMPTE CREDIT', value: 'COMPTE_CREDIT'}, {
                    name: 'CREDIT SOUFFRANCE',
                    value: 'CREDIT_SOUFFRANCE'
                }, {name: 'COMPTE IMPAYE', value: 'COMPTE_IMPAYE'}, {
                    name: 'IMPAYE SOUFFRANCE',
                    value: 'IMPAYE_SOUFFRANCE'
                }, {name: 'CREDIT IMMOBILISE', value: 'CREDIT_IMMOBILISE'}],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type Crédit',
                name: 'typeCredit',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-credit',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Compte Général',
                name: 'compteGeneral',
                type: 'select',
                displayName: 'numero',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'compte-general',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type Compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['natureCompte', 'dateCreated'],
        tabFileBody: ['natureCompte', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'},
            ],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },

    'admin/clients-saisi-fr': {
        title: 'Liste des clients à valider',
        titre: 'Ajout un client',
        titleFile: 'Liste des clients',
        sousTitle: 'un client',
        url: 'clients-saisi',
        reponse: 'client',
        typeEntity: 'ce client',
        entete: 'un client',
        addButton: false,
        code: '03120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Matricule', 'Intitulé', 'Ville', 'Type Client', 'Email', 'Statut', 'Date de création'],
        tabFileHead: ['Matricule', 'Intitulé', 'Ville', 'Type Client', 'Email', 'Statut', 'Date de création'],
        fields: [],
        searchFields: [
            {name: 'Matricule', field: 'matricule', type: 'text', value: ''},
            {name: 'Ancien Matricule', field: 'ancienMatricule', type: 'text', value: ''},
            {name: 'Intitulé', field: 'intitule', type: 'text', value: ''},
            {
                name: 'Activité Client', field: 'activiteClient',
                displayName: 'libelle',
                displayValue: 'id', type: 'selecct',
                typeSelect: 1, list: [], url: 'activite-client', value: ''
            },
            {
                name: 'Gestionnaire', field: 'gestionnaire',
                displayName: 'prenom',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'agent', value: ''
            },
            {
                name: 'Qualité', field: 'qualite',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'qualite', value: ''
            },
            {
                name: 'Type Client', field: 'typeClient',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'type-client', value: ''
            },
            {
                name: 'Catégorie Client', field: 'categorie',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'categorie-client', value: ''
            }

        ],
        tabBody: ['matricule', 'intitule', 'ville', 'typeClient', 'email', 'statut', 'createdAt'],
        tabFileBody: ['matricule', 'intitule', 'ville', 'typeClient', 'email', 'statut', 'createdAt'],
        action: [{name: 'detail-credit', icon: 'detail-credit', color: 'primary'}, {
            name: 'valider',
            icon: 'detail-virement',
            color: 'primary'
        }],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },

    'admin/clients-adhesion-fr': {
        title: 'Liste des clients valides',
        titre: 'Ajout un client',
        titleFile: 'Liste des clients',
        sousTitle: 'un client',
        url: 'clients-valide',
        reponse: 'client',
        typeEntity: 'ce client',
        entete: 'un client',
        addButton: false,
        code: '03130',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Matricule', 'Intitulé', 'Ville', 'Type Client', 'Email', 'Statut', 'Date de création'],
        tabFileHead: ['Matricule', 'Intitulé', 'Ville', 'Type Client', 'Email', 'Statut', 'Date de création'],
        fields: [],
        searchFields: [
            {name: 'Matricule', field: 'matricule', type: 'text', value: ''},
            {name: 'Ancien Matricule', field: 'ancienMatricule', type: 'text', value: ''},
            {name: 'Intitulé', field: 'intitule', type: 'text', value: ''},
            {
                name: 'Activité Client', field: 'activiteClient',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'activite-client', value: ''
            },
            {
                name: 'Gestionnaire', field: 'gestionnaire',
                displayName: 'prenom',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'agent', value: ''
            },
            {
                name: 'Qualité', field: 'qualite',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'qualite', value: ''
            },
            {
                name: 'Type Client', field: 'typeClient',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'type-client', value: ''
            },
            {
                name: 'Catégorie Client', field: 'categorie',
                displayName: 'libelle',
                displayValue: 'id', type: 'select',
                typeSelect: 1, list: [], url: 'categorie-client', value: ''
            }
        ],
        tabBody: ['matricule', 'intitule', 'ville', 'typeClient', 'email', 'statut', 'createdAt'],
        tabFileBody: ['matricule', 'intitule', 'ville', 'typeClient', 'email', 'statut', 'createdAt'],
        action: [{name: 'detail-credit', icon: 'detail-credit', color: 'primary'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },

    'admin/virement-compte-fr': {
        title: 'Gestion des validations Virements',
        titre: 'Ajout un Virement',
        titleFile: 'Liste des Virements',
        sousTitle: 'un Virement',
        url: 'virement-compte',
        reponse: 'Virement',
        typeEntity: 'ce Virement',
        entete: 'un Virement',
        addButton: true,
        code: '05110',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Nº Émetteur','Émetteur','Nº Récepteur','Récepteur', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Type transaction', 'Référence', 'Agence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['compte','prenomEmetteur','compteContrePartie','prenomRecepteur', 'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['typeTransaction', 'referenceExterne', 'agenceSource', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [{name: 'detail-virement', icon: 'detail-virement', color: 'primary'}, {
            name: 'valider',
            icon: 'detail-virement',
            color: 'primary'
        }, {name: 'annuler', icon: 'detail-virement', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/virement-permanent-fr': {
        title: 'Gestion des Virements permanents',
        titre: 'Ajout un Virement permanent',
        titleFile: 'Liste des Virements permanents',
        sousTitle: 'un Virement permanent',
        url: 'virements-permanents',
        reponse: 'Virement permanent',
        typeEntity: 'ce Virement permanent',
        entete: 'un Virement permanent',
        addButton: true,
        code: '07910',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numero', 'Client',  'Montant Virement',
            'Périodicité', 'Date Mise En Place',
            'Nombre Jour','Statut'],

tabFileHead: ['Nº', 'Client', 'Montant Virement',
    'Périodicité', 'Date MiseEnPlace',
    'Nombre Jour','Statut'],
        fields:
            [ {
                fxFlex: '50',
                label: 'Client Débiteur',
                name: 'clientDebiteur',
                type: 'selected5',
                displayName: 'libelle',
                displayValue: 'id',
                value: 'client',
                isRequired: false,
                list: [],
                url: '',
                validations: []
            },

                {
                    fxFlex: '50',
                    label: 'Compte Débit',
                    name: 'compteDebit',
                    type: 'selected3',
                    isRequired: true,
                    validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
                },{
            fxFlex: '50',
            label: 'Client Émetteur',
            name: 'client',
            type: 'selected2',
            displayName: 'libelle',
            displayValue: 'id',
            value: 'client',
            isRequired: true,
            list: [],
            url: '',
            validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
        },
                {
                fxFlex: '50',
                label: 'Compte Crédit',
                name: 'compteCredit',
                type: 'selected4',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

                {
            fxFlex: '50',
            label: 'Montant Virement',
            name: 'montantVirement',
            type: 'montant',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
        },{
            fxFlex: '50',
            label: 'Périodicité',
            name: 'periodicite',
            type: 'select',
            displayName: 'libelle',
            displayValue: 'code',
            value: '',
            isRequired: true,
            list: [],
            url: 'get-periodicites?categorie=VIRPERM',
            validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
        },{
            fxFlex: '50',
            label: 'Durée en Mois',
            name: 'dureeEnMois',
            type: 'text',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: ''}]
        },{
            fxFlex: '50',
            label: 'Nombre Jours Recherchés provision',
            name: 'nbreJourRechercheProvision',
            type: 'text',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: ''}]
        },{
            fxFlex: '50',
            label: 'Date Mise En Place',
            name: 'dateMiseEnPlace',
            type: 'date',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: ''}]
        },{
            fxFlex: '50',
            label: 'Date Première Écheance',
            name: 'datePremierEcheance',
            type: 'date',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: ''}]
        },
                {
            fxFlex: '50',
            label: 'Date Fin Virement',
            name: 'dateFinVirement',
            type: 'date',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: ''}]
        },
            {
            fxFlex: '50',
            label: 'Motif Virement',
            name: 'motifVirement',
            type: 'textarea',
            isRequired: true,
            validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
        },
            ],
        searchFields: [],
        tabBody: ['numero', 'client', 'montantVirement',
            'periodicite', 'dateMiseEnPlace',
            'nbreJourRechercheProvision','statut'],
        tabFileBody: ['numero', 'client', 'montantVirement',
            'periodicite', 'dateMiseEnPlace',
            'nbreJourRechercheProvision','statut'],
        action: [{name: 'detail-template', icon: 'detail-virement', color: 'primary'}, {
            name: 'valider-virement-permanent',
            icon: 'detail-virement',
            color: 'primary'
        }, {name: 'rejeter-virement-permanent', icon: 'detail-virement', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },


    'admin/operations-diverses-fr': {
        title: 'Gestion des opérations diverses',
        titre: 'Ajout une opération diverse',
        titleFile: 'Liste des opérations diverses',
        sousTitle: 'une opération diverse',
        url: 'operations-diverses',
        reponse: 'Opération diverse',
        typeEntity: 'cette opération diverse',
        entete: 'une opération diverse',
        addButton: true,
        code: '06220',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Motif', 'Numéro', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Motif', 'Numéro', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['motif', 'numeroOd', 'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['motif', 'numeroOd', 'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [
            // {name: 'valider', icon: 'detail-virement', color: 'primary'},
            // {name: 'annuler', icon: 'detail-virement', color: 'primary'},
            {name: 'detail-virement', icon: 'detail-virement', color: 'primary'}
        ],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/operations-diverse-fr': {
        title: 'Liste des opérations diverses',
        titre: 'Ajout une opération diverse',
        titleFile: 'Liste des opérations diverses',
        sousTitle: 'une opération diverse',
        url: 'operation-diverse',
        reponse: 'Virement',
        typeEntity: 'cette opération diverse',
        entete: 'une opération diverse',
        addButton: true,
        code: '06230',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Motif', 'Numéro', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Motif', 'Numéro', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['motif', 'numeroOd', 'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['motif', 'numeroOd', 'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [{name: 'detail-virement', icon: 'detail-virement', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },

    'admin/operations-retro-active-fr': {
        title: 'Liste des opérations retro-actives',
        titre: 'Ajout une opération retro-active',
        titleFile: 'Liste des opérations retro-active',
        sousTitle: 'une opération retro-active',
        url: 'operation-retro-active',
        reponse: 'Virement',
        typeEntity: 'cette opération retro-active',
        entete: 'une opération retro-active',
        addButton: true,
        code: '06260',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Motif', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Motif', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['motif',  'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['motif',  'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [{name: 'detail-virement', icon: 'detail-virement', color: 'primary'},{name: 'valider-retro', icon: 'detail-virement', color: 'primary'},{name: 'annuler-retro', icon: 'annuler-retro', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/operations-retro-active-validation-fr': {
        title: 'Liste des validations des opérations retro-actives',
        titre: 'Ajout une opération retro-active',
        titleFile: 'Liste des validations opérations retro-actives',
        sousTitle: 'une opération retro-active',
        url: 'operation-retro-actives',
        reponse: 'Virement',
        typeEntity: 'cette opération retro-active',
        entete: 'une opération retro-active',
        addButton: true,
        code: '06270',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Motif',  'Référence', 'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Motif', 'Référence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['motif',  'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['motif',  'referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [{name: 'detail-virement', icon: 'detail-virement', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },

    'admin/interval-retard-credit-fr': {
        title: 'Gestion des retards crédits',
        titre: 'Ajout un Intervalle Retard Crédit',
        titleFile: 'Liste des Intervalles Retards Crédits',
        sousTitle: 'un Intervalle Retard Crédit',
        url: 'interval-retard-credit',
        reponse: 'Intervalle Retard Crédit',
        typeEntity: 'ce intervalle retard crédit',
        entete: 'un Intervalle Retard Crédit',
        addButton: true,
        code: '02760',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Nombre Jour Retard Min', 'Nombre Jour Retard Max', 'Date Création'],
        tabFileHead: ['Code', 'Libellé', 'Nombre Jour Retard Min', 'Nombre Jour Retard Max', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nombre Jour Retard Min',
                name: 'nombreJourRetardMin',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nombre Jour Retard Max',
                name: 'nombreJourRetardMax',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'nombreJourRetardMin', 'nombreJourRetardMax', 'createdAt'],
        tabFileBody: ['code', 'libelle', 'nombreJourRetardMin', 'nombreJourRetardMax', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },
    'admin/periodicite-fr': {
        title: 'Gestion des périodicités',
        titre: 'Ajouter une périodicité',
        titleFile: 'Liste des périodicités',
        sousTitle: 'une périodicité',
        url: 'periodicite',
        reponse: 'périodicité',
        typeEntity: 'cette périodicité',
        entete: 'périodicité',
        addButton: false,
        code: '02630',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Duree en Jour', 'Duree en Mois'],
        tabFileHead: ['Code', 'Libelle', 'Duree en Jour', 'Duree en Mois'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Duree en Jour',
                name: 'nbreJour',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Duree en Mois',
                name: 'nbreMois',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'nbreJour', 'nbreMois'],
        tabFileBody: ['code', 'libelle', 'nbreJour', 'nbreMois'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/nature-piece-fr': {
        title: 'Gestion des natures de pièces',
        titre: 'Ajout une nature de pièces',
        titleFile: 'Liste des natures de pièces',
        sousTitle: 'une nature de pièces',
        url: 'nature-piece',
        reponse: 'nature pièce',
        typeEntity: 'cette nature de pièces',
        entete: 'une nature de pièces',
        addButton: true,
        code: '02350',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Valeur minimale', 'Valeur maximale', 'Durée de validité (années)'],
        tabFileHead: ['Code', 'Libelle', 'Valeur minimale', 'Valeur maximale', 'Durée de validité'],
        fields: [
            {
                fxFlex: '100',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Valeur minimale',
                name: 'nombreCaractereMin',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Valeur maximale',
                name: 'nombreCaractereMax',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Durée de validité (années)',
                name: 'durreValidite',
                type: 'number',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'nombreCaractereMin', 'nombreCaractereMax', 'durreValidite'],
        tabFileBody: ['code', 'libelle', 'nombreCaractereMin', 'nombreCaractereMin', 'durreValidite'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/profession-fr': {
        title: 'Gestion des natures de professions',
        titre: 'Ajout une profession',
        titleFile: 'Liste des profession',
        sousTitle: 'une profession',
        url: 'profession',
        reponse: 'profession',
        typeEntity: 'cette profession',
        entete: 'une profession',
        addButton: true,
        code: '02360',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle'],
        tabFileHead: ['Code', 'Libelle'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle'],
        tabFileBody: ['code', 'libelle'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/type-attribut-fr': {
        title: 'Gestion des Types attribut',
        titre: 'Ajout un Type attribut',
        titleFile: 'Liste des Types attribut',
        sousTitle: 'un type attribut',
        url: 'type-attribut',
        reponse: 'type attribut',
        typeEntity: 'ce type attribut',
        entete: 'un type attribut',
        addButton: true,
        code: '09110',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Type de données', 'Nature attribut', 'Est obligatoire', 'Date Création'],
        tabFileHead: ['Code', 'Libellé', 'Type de données', 'Nature attribut', 'Est obligatoire', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de données',
                name: 'dataType',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: true,
                list: [{name: 'FICHIER', value: 'FILE'}, {
                    name: 'CHAINE DE CARACTERE',
                    value: 'STRING'
                }, {name: 'ENTIER', value: 'INTEGER'}, {name: 'BOOLEEN', value: 'BOOLEAN'}, {
                    name: 'DECIMAL',
                    value: 'BIGDECIMAL'
                }, {name: 'DATE', value: 'DATE'}],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Nature Attribut',
                name: 'natureAttribut',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: true,
                list: [
                    {name: 'CLIENT', value: 'CLIENT'},
                    {name: 'CREDIT', value: 'CREDIT'},
                    {name: 'GARANTIE', value: 'GARANTIE'},
                    {name: 'COMPTE', value: 'COMPTE'}
                ],
                url: '',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Est obligatoire',
                name: 'estObligatoire',
                type: 'matSlideToggle',
                isRequired: false,
                validations: [{name: 'required', value: 'Validators.required', message: ' "Ce champ est obligatoire"'}],
                displayName: 'name',
                displayValue: 'id',
                list: []
            }
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'dataType', 'natureAttribut', 'estObligatoire', 'dateCreated'],
        tabFileBody: ['code', 'libelle', 'dataType', 'natureAttribut', 'estObligatoire', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },
    'admin/attribut-complementaire-fr': {
        title: 'Gestion des attributs complementaires',
        titre: 'Ajout un attribut complementaire',
        titleFile: 'Liste des attributs complementaire',
        sousTitle: 'un attribut complementaire',
        url: 'attribut-complementaire',
        reponse: 'attribut complementaire',
        typeEntity: 'cet attribut complementaire',
        entete: 'un attribut complementaire',
        addButton: true,
        code: '09120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Référence', 'Valeur', 'Type attribut', 'Date Création'],
        tabFileHead: ['Référence', 'Valeur', 'Type attribut', 'Date Création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'codeAgence',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Référence',
                name: 'referenceObjet',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Valeur',
                name: 'valeur',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type attribut',
                name: 'typeAttribut',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-attribut',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [],
        tabBody: ['referenceObjet', 'valeur', 'typeAttribut', 'dateCreated'],
        tabFileBody: ['referenceObjet', 'valeur', 'typeAttribut', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '45rem', height: '27rem'}]
    },
    'admin/virement-compt-fr': {
        title: 'Liste des Virements',
        titre: 'Ajout un Virement',
        titleFile: 'Liste des Virements',
        sousTitle: 'un Virement',
        url: 'virement-compt',
        reponse: 'Virement',
        typeEntity: 'ce Virement',
        entete: 'un Virement',
        addButton: true,
        code: '09130',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: [ 'Nº Émetteur','Émetteur','Nº Récepteur','Récepteur','Référence',  'Montant', 'Statut', 'Date transaction'],
        tabFileHead: ['Type transaction', 'Référence', 'Agence', 'Montant', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [],
        tabBody: ['compte','prenomEmetteur','compteContrePartie','prenomRecepteur','referenceExterne', 'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['typeTransaction', 'referenceExterne', 'agenceSource', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [{name: 'detail-virement', icon: 'detail-virement', color: 'primary'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/message-template-fr': {
        title: 'Gestion des messages template',
        titre: 'Ajout un message template',
        titleFile: 'Liste des messages template',
        sousTitle: 'un message template',
        url: 'templates',
        customBaseUrl: environment.apicomURL,
        reponse: 'Message template',
        typeEntity: 'ce message template',
        entete: 'un message template',
        addButton: true,
        code: '08510',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Durée validité'],
        tabFileHead: ['Code', 'Libellé', 'Durée validité'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code Template',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Durée de validité (En minutes)',
                name: 'dureeValide',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type Message',
                name: 'typeMessage',
                type: 'select',
                displayName: 'name',
                displayValue: 'value',
                value: '',
                isRequired: false,
                list: [
                    {name: 'MAIL', value: 'mail'},
                    {name: 'SMS', value: 'sms'},
                ],
                url: '',
                validations: []
            },
            {
                fxFlex: '100',
                label: 'SMS Template',
                name: 'formatMessageSms',
                class: 'texte',
                type: 'textarea',
                isRequired: false,
                validations: []
            },

            {
                fxFlex: '100',
                label: 'Email Template',
                name: 'formatMessageEmail',
                class: 'text',
                type: 'mail-template',
                isRequired: false,
                validations: []
            },

        ],
        searchFields: [
            {name: 'Code', field: 'code', type: 'text', value: ''},
            {name: 'Libellé', field: 'libelle', type: 'text', value: ''},
            {name: 'Durée de validité', field: 'dureeValide', type: 'text', value: ''}
        ],
        tabBody: ['code', 'libelle', 'dureeValide'],
        tabFileBody: ['code', 'libelle', 'dureeValide'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/messages-fr': {
        title: 'Gestion des messages ',
        titre: 'Ajout un message ',
        titleFile: 'Liste des messages ',
        sousTitle: 'un message ',
        url: 'message',
        reponse: 'Message ',
        typeEntity: 'ce message ',
        entete: 'un message ',
        addButton: true,
        code: '07010',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Type message', 'Objet', 'Message', 'Date de creation'],
        tabFileHead: ['Type message', 'Objet', 'Message', 'Date de creation'],
        fields: [
            {
                fxFlex: '50',
                label: 'Type message',
                name: 'typeMessage',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Objet',
                name: 'objet',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Message',
                name: 'message',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },

        ],
        searchFields: [
            {name: 'Type Message', field: 'typeMessage', type: 'text', value: ''},
            {name: 'Objet', field: 'objet', type: 'text', value: ''},
        ],
        tabBody: ['typeMessage', 'objet', 'message', 'createdAt'],
        tabFileBody: ['typeMessage', 'objet', 'message', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },
    'admin/transactions-jour-fr': {
        title: 'Gestion des transactions du jour',
        titre: 'Ajout une transaction du jour',
        titleFile: 'Liste des transactions du jour',
        sousTitle: 'une transaction du jour',
        url: 'liste-transaction-journee',
        reponse: 'Transactions du jour',
        typeEntity: 'cette transaction du jour',
        entete: 'une transaction du jour',
        addButton: false,
        code: '06120',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Agence source', 'Agence destinatrice', 'Intitule transaction',  'Montant transaction', 'Statut', 'Date transaction'],
        tabFileHead: ['Agence source', 'Agence destinatrice', 'Intitule transaction', 'Montant transaction', 'Statut', 'Date transaction'],
        fields: [],
        searchFields: [
            {
                name: 'Evenement comptable', field: 'evenementComptable', type: 'select', value: '',
                isRequired: false,
                displayName: 'libelle',
                displayValue: 'libelle',
                list: [],
                url: 'evenement-comptable',
                validations: []
            },
            //type-transaction
            {
                name: 'Type transaction', field: 'typeTransaction', type: 'select', value: '',
                isRequired: false,
                displayName: 'libelle',
                displayValue: 'libelle',
                list: [],
                url: 'type-transaction',
                validations: []
            }
        ],
        tabBody: ['agenceSource', 'agenceDestinatrice', 'intituleTransaction',  'montantTransaction', 'statut', 'dateTransaction'],
        tabFileBody: ['agenceSource', 'agenceDestinatrice', 'intituleTransaction', 'montantTransaction', 'statut', 'dateTransaction'],
        action: [
            {name: 'detail-virement', icon: 'detail-virement', color: 'primary'},
            {name: 'annuler_transaction', icon: 'detail-virement', color: 'primary'}
        ],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },


    'admin/transactions-fr': {
        title: 'Mouvements comptes',
        titre: 'Ajout une transaction',
        titleFile: 'Liste des transactions',
        sousTitle: 'une transaction',
        url: 'liste-transaction-historise',
        reponse: 'Transactions',
        typeEntity: 'cette transaction',
        entete: 'une transaction',
        addButton: false,
        code: '06600',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Date écriture', 'Numéro compte', 'Libellé compte', 'Compte général', 'Montant', 'Écriture', 'Numéro opération'],
        tabFileHead: ['Date', 'Numéro compte', 'Libellé compte', 'Compte général', 'Montant', 'Écriture', 'Numéro opération'],
        fields: [],
        searchFields: [
            {
                name: 'Date début',
                field: 'debut',
                type: 'date',
                isRequired: false,
                validations: []
            },
            {
                name: 'Date fin',
                field: 'fin',
                type: 'date',
                isRequired: false,
                validations: []
            },
            {name: 'Numéro compte', field: 'numero', type: 'text', value: ''},
            {
                name: 'Évenement comptable', field: 'evenementComptable', type: 'select', value: '',
                isRequired: false,
                displayName: 'libelle',
                displayValue: 'libelle',
                list: [],
                url: 'evenement-comptable',
                validations: []
            }
        ],
        tabBody: ['dateEcriture', 'numeroCompte', 'libelleCompte', 'numeroCompteGeneral', 'montant', 'libelleEcriture', 'numeroOperation'],
        tabFileBody: ['dateEcriture', 'numeroCompte', 'libelleCompte', 'numeroCompteGeneral', 'montant', 'libelleEcriture', 'numeroOperation'],
        action: [
            {
                name: 'detail-historique',
                icon: 'detail-historique',
                color: 'primary'
            },
            {
                name: 'extourner',
                icon: 'detail-virement',
                color: 'primary'
            }
        ],
        taillemodal: [{width: '48rem', height: '27rem'}]
    },

    'admin/banque-agence-fr': {
        title: 'Gestion banques',
        titre: 'Ajout une banque',
        titleFile: 'Liste des banques',
        sousTitle: 'une banque',
        url: 'banque-by-agence',
        reponse: 'banque',
        typeEntity: 'cette banque',
        entete: 'banque',
        addButton: false,
        code: '06170',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libelle', 'Relevé d\'Identité Bancaire'],
        tabFileHead: ['Code', 'Libelle', 'Relevé d\'Identité Bancaire'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libellé',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Relevé d\'Identité Bancaire',
                name: 'rib',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Type de compte',
                name: 'typeCompte',
                type: 'select',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'type-compte',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            // { fxFlex: '50', label: 'Compte', name: 'compte', type: 'select', displayName: 'numero',displayValue: 'id', value: '', isRequired: true, list: [], url: 'compte', validations: [] },
            {
                fxFlex: '50',
                label: 'Logo',
                name: 'logo',
                type: 'file',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [
            {name: 'Code', field: 'code', type: 'text', value: ''},
            {name: 'Libellé', field: 'libelle', type: 'text', value: ''}
        ],
        tabBody: ['code', 'libelle', 'rib'],
        tabFileBody: ['code', 'libelle', 'rib'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'detailBanque', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/reservation-fr': {
        title: 'Gestion des reservations de fonds',
        titre: 'Ajout une reservation de fonds',
        titleFile: 'Liste des reservations de fonds',
        sousTitle: 'une reservation de fonds',
        url: 'reservations-fonds',
        reponse: 'reservation de fonds',
        typeEntity: 'cette reservation de fonds',
        entete: 'reservation de fonds',
        addButton: true,
        code: '09100',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Numero', 'Montant', 'Motif', 'Date de creation'],
        tabFileHead: ['Numero', 'Montant', 'Motif', 'Date de creation'],
        fields: [
            {
                fxFlex: '50',
                label: 'Numero',
                name: 'numero',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Montant',
                name: 'montant',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Motif',
                name: 'motif',
                type: 'textarea',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [
            {name: 'Numero', field: 'numero', type: 'text', value: ''},
            {name: 'Montant', field: 'montant', type: 'text', value: ''}
        ],
        tabBody: ['numero', 'montant', 'motif', 'createdAt'],
        tabFileBody: ['numero', 'montant', 'motif', 'createdAt'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
            name: 'supprimer',
            icon: 'delete',
            color: 'red'
        }, {name: 'detailBanque', icon: 'eyes', color: 'green'}],
        taillemodal: [{width: '38rem', height: '27rem'}]
    },
    'admin/typeOperation-courante-fr': {
        title: 'Gestion des types opérations courantes',
        titre: 'Ajout type opération',
        titleFile: 'Liste des types opérations courantes\'',
        sousTitle: 'un type opération',
        url: 'types-operations-courantes',
        reponse: 'type opération',
        typeEntity: 'ce type opération',
        entete: 'un type opération',
        addButton: true,
        code: '099920',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé','Compte Débit','Compte Crédit','Date création'],
        tabFileHead: ['Code', 'Libellé','Compte Débit','Compte Crédit','Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Agence',
                name: 'agence',
                type: 'selectAg',
                displayName: 'libelle',
                displayValue: 'id',
                value: '',
                isRequired: true,
                list: [],
                url: 'agence',
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Compte Débit',
                name: 'compteDebit',
                type: 'selectDeb',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Compte Crédit',
                name: 'compteCredit',
                type: 'selectCred',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle','compteDebit','compteCredit', 'dateCreated'],
        tabFileBody: ['code', 'libelle','compteDebit','compteCredit', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '30rem', height: 'auto'}]
    },
    'admin/evenement-communication-fr': {
        title: 'Gestion des événements communication',
        titre: 'Ajout événement communication',
        titleFile: 'Liste des événements communication',
        sousTitle: 'un événement communication',
        url: 'evenement-communication',//api a contacter
        reponse: 'événement communication',
        typeEntity: 'cet événement communication',
        entete: 'un événements communication',
        addButton: true,
        code: '099940',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['Code', 'Libellé', 'Activer','Date création'],
        tabFileHead: ['Code', 'Libellé', 'Activer','Date création'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Activer',
                name: 'isActive',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'isActive', 'dateCreated'],
        tabFileBody: ['code', 'libelle', 'isActive', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '30rem', height: 'auto'}]
    },

//test
    'admin/clinker-fr': {
        title: 'Plateforme',
        titre: 'Ajout événement communication',
        titleFile: 'Liste des événements communication',
        sousTitle: 'un événement communication',
        url: 'evenement-communication',
        reponse: 'événement communication',
        typeEntity: 'cet événement communication',//
        entete: 'un événements communication',
        addButton: true,
        code: '07410',
        filterType: 'local',
        exportFile: ['excel', 'pdf'],
        tabHead: ['CodePlateforme', 'email', 'site web'],
        tabFileHead: ['CodePlateforme', 'email', 'site web'],
        fields: [
            {
                fxFlex: '50',
                label: 'Code',
                name: 'code',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Libelle',
                name: 'libelle',
                type: 'text',
                isRequired: true,
                validations: [{name: 'required', value: 'Validators.required', message: 'Ce champ est obligatoire'}]
            },
            {
                fxFlex: '50',
                label: 'Activer',
                name: 'isActive',
                type: 'matSlideToggle',
                isRequired: false,
                validations: []
            },
        ],
        searchFields: [],
        tabBody: ['code', 'libelle', 'isActive'],
        tabFileBody: ['code', 'libelle', 'isActive', 'dateCreated'],
        action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {name: 'supprimer', icon: 'delete', color: 'red'}],
        taillemodal: [{width: '30rem', height: 'auto'}]
    },



};
