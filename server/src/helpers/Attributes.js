import AttributeModel from '../models/trudigital/AttributeModel';
import OrganizationModel from '../models/trudigital/OrganizationModel';

export async function getOrganizationAttribute( organization_id, handle ){
	let organization = await OrganizationModel.findOne({_id: organization_id}).populate('attributes');
	let attributes   = organization.attributes.toObject();

	if( !organization ){
		throw new Error(`No organization found with id '${organization_id}'`);
	}	
	if( !organization.attributes ){
		throw new Error(`No attributes found for organization '${organization_id}'`);
	}
	if( !attributes[handle] ){
		throw new Error(`Attribute '${handle}' not set for organization '${organization_id}'`);
	}
	return attributes[handle];
}