DROP VIEW IF EXISTS bd.vue_avis;

DROP VIEW IF EXISTS bd.vue_config;

-- ========================================
--      Vue : vue_avis
-- ========================================
CREATE OR REPLACE VIEW bd.vue_avis AS (
    SELECT bd.avis.numero_avis, bd.avis.numero_configuration, bd.avis.note, bd.avis.numero_personne, 
    CASE
        WHEN classement.nb_appreciations IS NOT NULL 
        THEN classement.nb_appreciations
        ELSE 0
    END AS nb_appreciations , 
        CASE 
        WHEN classement.indice IS NOT NULL 
        THEN classement.indice
        ELSE 0
    END AS indice,bd.avis.date_avis, bd.avis.commentaire FROM bd.avis 
    LEFT JOIN ( 
        WITH c_table AS ( 
            SELECT numero_avis,
            CASE 
            WHEN sum(pertinence)>=1 THEN sum(pertinence)
            ELSE 0
            END AS c FROM bd.appreciation
            GROUP BY numero_avis), 
        d_table AS (
            SELECT numero_avis,
            CASE 
            WHEN sum(pertinence)<=-1 
            THEN sum(pertinence)*-1
            ELSE 0
            END AS d
            FROM bd.appreciation
            GROUP BY numero_avis)
        SELECT c_table.numero_avis, c_table.c+d_table.d AS nb_appreciations, (1+c_table.c)/(1+d_table.d) AS indice
        FROM c_table
        INNER JOIN d_table ON c_table.numero_avis=d_table.numero_avis
        GROUP BY c_table.numero_avis)
    AS classement ON bd.avis.numero_avis=classement.numero_avis);

-- ========================================
--      Vue : vue_config
-- ========================================
CREATE OR REPLACE VIEW bd.vue_config AS (
    SELECT C.numero_configuration, J.numero_jeu, J.nom as nom_jeu, E.numero_extension, E.nom as nom_extension FROM bd.configuration as C
    INNER JOIN bd.extension_configuration as EC ON EC.numero_configuration = C.numero_configuration
    INNER JOIN bd.extension as E ON E.numero_extension=EC.numero_extension
    INNER JOIN bd.jeu as J on C.numero_jeu = J.numero_jeu
)