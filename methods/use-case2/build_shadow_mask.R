############################################################
# Function for automatic calculation of a shadow Mask
############################################################

build_shadow_mask = function(dhm_path, projlocation){

  # load packages
  library(raster)
  library(doParallel)
  library(rgrass7)

  # init Grass
  grasslib <- try(system('grass78 --config', intern=TRUE))[4] # get path to grasslib
  use_sp()
  initGRASS(gisBase=grasslib, gisDbase="./use-case2/grassdata", location=projlocation, mapset='PERMANENT', override=TRUE)
}