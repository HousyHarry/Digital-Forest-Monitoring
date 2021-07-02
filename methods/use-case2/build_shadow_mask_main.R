############################################################
# Automatic calculation of a shadow Mask
#
# by Daniel Peter, BFH-HAFL
############################################################

setwd("~/SA/Digital-Forest-Monitoring/methods")

# source functions
source("use-case2/build_shadow_mask.R")

# paths
main_path = "//mnt/smb.hdd.rbd/BFH/Geodata/ESA/S2MSI2Ap/SAFE/"

build_shadow_mask(main_path, location='schweiz')