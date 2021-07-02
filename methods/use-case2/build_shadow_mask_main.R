############################################################
# Automatic calculation of a shadow Mask
#
# by Daniel Peter, BFH-HAFL
############################################################

setwd("~/SA/Digital-Forest-Monitoring/methods")

# source functions
source("use-case2/build_shadow_mask.R")

# paths
dhm_path = "/mnt/smb.hdd.rbd/HAFL/9 Share/PermanenteOrdner/Geodaten/Nationale_Daten/Nationale_Daten_SWISSTOPO/DHM_10m"
dhm_file = "dhm_10m.tif"

build_shadow_mask(dhm_path, dhm_file, projlocation='schweiz')