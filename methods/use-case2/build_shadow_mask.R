############################################################
# Function for automatic calculation of a shadow Mask
############################################################

build_shadow_mask = function(dhm_path, dhm_file, projlocation){

  # load packages
  library(raster)
  library(doParallel)
  library(rgrass7)

  # init Grass
  grasslib <- try(system('grass78 --config', intern=TRUE))[4] # get path to grasslib
  use_sp()
  initGRASS(gisBase=grasslib, gisDbase="./use-case2/grassdata", location=projlocation, mapset='PERMANENT', override=TRUE)

  execGRASS("r.import", parameters = list(input=paste0(dhm_path,dhm_file), output='tmp_dhm'))
}